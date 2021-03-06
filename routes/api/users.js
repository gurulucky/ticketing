const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const router = express.Router();
const gravatar = require('gravatar');
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const User = require('../../models').User;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

let upload = multer({ storage, fileFilter });

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  check('firstName', 'First Name is required').notEmpty(),
  check('lastName', 'Last Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, phone, role, password } = req.body;

    let user = await User.findOne({ where: { email } });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User already exists' }] });
    }

    const avatar = normalize(
      gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      }),
      { forceHttps: true }
    );

    user = {
      firstName,
      lastName,
      phone,
      email,
      avatar,
      role,
      password
    };

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    let createdUser = User.create(user);
    const payload = {
      user: {
        id: createdUser.id
      }
    };

    jwt.sign(
      payload,
      "config_get('jwtSecret')",
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  }
);


router.post(
  '/savedetail',
  auth,
  upload.single('avatar'),
  check('email', 'Please include a valid email').isEmail(),
  check('firstName', 'First name is required').notEmpty(),
  check('lastName', 'Last name is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.user.id;
    // console.log(req);
    let userDetail = { ...req.body, avatar: req.file?.filename };
    if (!req.file) {
      delete userDetail.avatar;
    }
    // const { firstName, lastName, email, phone } = req.body;
    let result = await User.update(userDetail, { where: { id } });
    return res.json(result[0] ? userDetail : null);
  }
)

router.post(
  '/resetpassword',
  auth,
  check('curPassword', 'Current password is required').exists(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { curPassword, password } = req.body;
    let user = await User.findByPk(req.user.id);
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Please sign in first' }] });
    }

    const isMatch = await bcrypt.compare(curPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Current password is incorrect' }] })
    }

    const salt = await bcrypt.genSalt(10);
    newPassword = await bcrypt.hash(password, salt);

    let result = User.update({ password: newPassword }, { where: { id: req.user.id } });
    return res.json(result[0]);
  }
)


module.exports = router;
