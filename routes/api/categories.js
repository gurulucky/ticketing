const express = require('express');
const router = express.Router();

const Category = require('../../models').Category;

router.get('/', async (req, res) => {
    try {
        let categories = await Category.findAll();
        res.json(categories);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Sever Error');
    }
})

module.exports = router;