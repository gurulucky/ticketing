import React, { Fragment, useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Container, TextField, Stack, Button } from '@mui/material';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    password2: ''
  });

  const { firstName, lastName, email, phone, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ firstName, lastName, email, phone, password });
    }
  };

  // if (isAuthenticated) {
  //   return <Redirect to="/dashboard" />;
  // }
  useEffect(() => {
    if (isAuthenticated) {
      history.goBack();
    }
  },[isAuthenticated])

  return (
    <Container sx={{ minHeight: window.innerHeight * 0.6 + 'px' }}>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      {/* <form className="form" onSubmit={onSubmit}> */}
      <Stack direction='column' spacing={2}>
        <Stack direction="row" spacing={1}>
          <TextField
            type='text'
            label="First Name"
            name="firstName"
            value={firstName}
            onChange={onChange}
            sx={{ width: "50%" }}
          />
          <TextField
            type='text'
            label="Last Name"
            name="lastName"
            value={lastName}
            onChange={onChange}
            sx={{ width: "50%" }}
          />
        </Stack>
        <TextField
          type="email"
          label="Email Address"
          name="email"
          value={email}
          onChange={onChange}
          sx={{ width: "100%" }}
        />
        <TextField
          type="number"
          label="Phone number"
          name="phone"
          value={phone}
          onChange={onChange}
          sx={{ width: "100%" }}
        />
        <TextField
          type="password"
          label="Password"
          name="password"
          value={password}
          onChange={onChange}
        />
        <TextField
          type="password"
          label="Confirm Password"
          name="password2"
          value={password2}
          onChange={onChange}
        />
        {/* <input type="submit" className="btn btn-primary" value="Register" /> */}
        <Button variant='contained' color='primary' onClick={onSubmit}>Register</Button>
        {/* </form> */}
      </Stack>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Container>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
