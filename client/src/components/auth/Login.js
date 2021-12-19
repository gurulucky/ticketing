import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { FormControl, Stack, TextField, Typography, Button, Container } from '@mui/material';

const Login = ({ login, isAuthenticated }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  useEffect(() => {
    if(isAuthenticated){
      history.goBack();
    }
  },[isAuthenticated])
  // if (isAuthenticated) {
  //   return <Redirect to="/dashboard" />;
  // }

  return (
    <Container sx={{ minHeight: window.innerHeight * 0.6 + 'px' }}>
      <h1 className="large text-primary">Sign In</h1>

      <Stack direction='column' spacing={2}>
        <TextField
          type="email"
          label="Email Address"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
        <TextField
          type="password"
          label="Password"
          name="password"
          value={password}
          onChange={onChange}
          minLength="6"
        />
        <Button variant='contained' color='primary' onClick={onSubmit}>Sign In</Button>
      </Stack>
      <Typography variant='body2'>
        Don't have an account? <Link to="/register">Sign Up</Link>
      </Typography>
    </Container >
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
