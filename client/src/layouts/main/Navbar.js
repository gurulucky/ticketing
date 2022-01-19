import React, { Fragment, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { Stack, Typography, IconButton, Paper, InputBase, Avatar, Menu, MenuItem, Divider, ListItemIcon } from '@mui/material';
import { AccountCircle, Settings, Logout, Login } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import EventIcon from '@mui/icons-material/Event';
import { NavMenuItem } from '../../pages/styled/StyledInput';
import { setSearchData } from '../../actions/event';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const role = useSelector(state => state.auth.user?.role);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [search, setSearch] = useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    dispatch(setSearchData(e.target.value));
  }

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      // console.log('search',e.target.value);
      // history.push('/event');
      navigate('/event', {replace:true});
      // window.location.reload();
    }
  }

  const Links = (
    <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={1}>
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
      <NavLink to='/venue' style={{ textDecoration: 'none' }}>
        <NavMenuItem variant='h6'>
          Venues
        </NavMenuItem>
      </NavLink>
      <IconButton onClick={handleClick} sx={{ ml: 2, color: 'white' }}>
        <AccountCircle fontSize='large' />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <NavLink to='/profile' style={{ textDecoration: 'none', color: 'black' }}>
          <MenuItem>
            <ListItemIcon>
              <AccountCircle fontSize="small" />
            </ListItemIcon>
            My Account
          </MenuItem>
        </NavLink>
        {
          isAuthenticated ?
            <>
              <MenuItem onClick={() => dispatch(logout())}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
              <Divider />
              {
                role === "client" &&
                <NavLink to='/client'  style={{ textDecoration: 'none', color: 'black' }}>
                  <MenuItem onClick={() => dispatch(logout())}>
                    <ListItemIcon>
                      <EventIcon fontSize="small" />
                    </ListItemIcon>
                    Manage events
                  </MenuItem>
                </NavLink>
              }
            </>
            :
            <NavLink to='/login' style={{ textDecoration: 'none', color: 'black' }}>
              <MenuItem>
                <ListItemIcon>
                  <Login fontSize="small" />
                </ListItemIcon>
                Login
              </MenuItem>

            </NavLink>
        }
      </Menu>
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
            Crypticks
          </Typography>
        </Link>
        <Paper
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
          <InputBase
            value={search}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Artist, Event or Venue"
            inputProps={{ 'aria-label': 'search google maps' }}
            onKeyDown={keyPress}
            onChange={handleSearchChange}
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

export default Navbar;
