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
    if (isAuthenticated) {
      history.goBack();
    }
  }, [isAuthenticated])
  // if (isAuthenticated) {
  //   return <Redirect to="/dashboard" />;
  // }

  return (
    <Container sx={{ minHeight: window.innerHeight * 0.6 + 'px' }}>
      <h1 className="large text-primary">Sign In</h1>

      <form onSubmit={onSubmit}>
        <Stack direction='column' spacing={2}>
          <TextField
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
          <TextField
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
          />
          <Button type="submit" variant='contained' color='primary' sx={{ width: "100%" }}>Sign In</Button>
        </Stack>
      </form>
      <Typography variant='body1' sx={{mt:'20px'}}>
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
