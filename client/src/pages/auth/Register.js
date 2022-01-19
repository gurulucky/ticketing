import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, useNavigate } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Container, TextField, Stack, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    password2: ''
  });

  const { firstName, lastName, email, phone, password, password2, role } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAccountType = (e) => {
    setFormData({ ...formData, role: e.target.value });
    console.log({ ...formData, role: e.target.value });
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ firstName, lastName, email, phone, role, password });
    }
  };

  // if (isAuthenticated) {
  //   return <Redirect to="/dashboard" />;
  // }
  useEffect(() => {
    if (isAuthenticated) {
      navigate(-1);
    }
  }, [isAuthenticated])

  return (
    <Container sx={{ minHeight: window.innerHeight * 0.6 + 'px' }}>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form onSubmit={onSubmit}>
        <Stack direction='column' spacing={2}>
          <Stack direction="row" spacing={1}>
            <TextField
              type='text'
              label="First Name"
              name="firstName"
              value={firstName}
              onChange={onChange}
              sx={{ width: "50%" }}
              required
            />
            <TextField
              type='text'
              label="Last Name"
              name="lastName"
              value={lastName}
              onChange={onChange}
              sx={{ width: "50%" }}
              required
            />
          </Stack>
          <TextField
            type="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            sx={{ width: "100%" }}
            required
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
            required
          />
          <TextField
            type="password"
            label="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
          />
          <RadioGroup row aria-label="Accout type" defaultValue="guest" name="row-radio-buttons-group" onChange={handleAccountType}>
            <FormControlLabel value="guest" control={<Radio />} label="Guest" />
            <FormControlLabel value="client" control={<Radio />} label="Client" />
          </RadioGroup>
          {/* <input type="submit" className="btn btn-primary" value="Register" /> */}
          <Button variant='contained' color='primary' type='submit'>Register</Button>
        </Stack>
      </form>
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
