import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { Stack, Typography, TextField, InputAdornment, IconButton, Paper, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { NavMenuItem } from '../styled/StyledInput';

const Navbar = ({ auth: { isAuthenticated }, logout }) => {

  const Links = (
    <Stack direction='row' alignItems='flex-end' spacing={1}>
      <NavLink to='/home' style={{ textDecoration: 'none' }}>
        <NavMenuItem variant='h6'>
          Home
        </NavMenuItem>
      </NavLink>
      <NavLink to='/event' style={{ textDecoration: 'none' }}>
        <NavMenuItem variant='h6'>
          What's on
        </NavMenuItem>
      </NavLink>
      {
        isAuthenticated ?
          <NavMenuItem variant='h6' onClick={logout}>
            <i className="fas fa-sign-out-alt" />{' '}
            <span className="hide-sm">SignOut</span>
          </NavMenuItem>
          :
          <NavLink to='/login' style={{ textDecoration: 'none' }}>
            <NavMenuItem variant='h6'>
              Sign In
            </NavMenuItem>
          </NavLink>
      }
    </Stack>
  );

  return (
    <Stack direction="column" alignItems='center'>
      <Stack direction='row' justifyContent="space-between" alignItems='center'
        sx={{
          width: "100%",
          height: "80px",
          backgroundColor: "#17a2b8",
          margin: "0px",
          borderBottom: "1px solid #17a2b8"
        }}
      >
        <Link to="/" style={{ textDecoration: 'none', paddingLeft: "30px" }}>
          <Typography color="white" variant='h4' fontWeight='bold'>
            Ticketing
          </Typography>
        </Link>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Artist, Event or Venue"
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Fragment>{Links}</Fragment>
      </Stack>

    </Stack >
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
