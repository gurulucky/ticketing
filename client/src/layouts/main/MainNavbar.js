import React, { useState } from 'react';
import { NavLink as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// material
import { styled } from '@material-ui/core/styles';
import { Box, Button, AppBar, Toolbar, Container } from '@material-ui/core';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
// components
import Logo from '../../components/Logo';
import { MHidden } from '../../components/@material-extend';
import MyAvatar from '../../components/MyAvatar';
//
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import navConfig from './MenuConfig';
import { setSearchData } from '../../actions/event';
import { logout } from '../../actions/auth';
import { Stack, Typography, IconButton, Paper, InputBase, Avatar, Menu, MenuItem, Divider, ListItemIcon } from '@mui/material';
import { AccountCircle, Settings, Logout, Login } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import EventIcon from '@mui/icons-material/Event';
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  [theme.breakpoints.up('md')]: {
    height: APP_BAR_DESKTOP
  }
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8
}));

// ----------------------------------------------------------------------

export default function MainNavbar() {
  const isOffset = useOffSetTop(100);
  const { pathname } = useLocation();
  const isHome = pathname === '/';
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
      navigate('/event', { replace: true });
      // window.location.reload();
    }
  }

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            bgcolor: 'background.default',
            height: { md: APP_BAR_DESKTOP - 16 }
          })
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <RouterLink to="/">
            <Logo />
          </RouterLink>
          <Typography variant='h4' color='primary'>
            Crypticks
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

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
          <Box sx={{ flexGrow: 1 }} />

          <MHidden width="mdDown">
            <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={navConfig} />

            <IconButton onClick={handleClick} sx={{
              ml: 2,
              color: 'text.primary'
            }}>
              <MyAvatar/>
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
              {
                isAuthenticated ?
                  <>
                    <RouterLink to='/user' style={{ textDecoration: 'none', color: 'black' }}>
                      <MenuItem>
                        <ListItemIcon>
                          <AccountCircle fontSize="small" />
                        </ListItemIcon>
                        My Account
                      </MenuItem>
                    </RouterLink>
                    <MenuItem onClick={() => dispatch(logout())}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                    <Divider />
                    {
                      role === "client" &&
                      <RouterLink to='/client/dashboard' style={{ textDecoration: 'none', color: 'black' }}>
                        <MenuItem>
                          <ListItemIcon>
                            <EventIcon fontSize="small" />
                          </ListItemIcon>
                          Manage events
                        </MenuItem>
                      </RouterLink>
                    }
                  </>
                  :
                  <RouterLink to='/auth/login' style={{ textDecoration: 'none', color: 'black' }}>
                    <MenuItem>
                      <ListItemIcon>
                        <Login fontSize="small" />
                      </ListItemIcon>
                      Login
                    </MenuItem>

                  </RouterLink>
              }
            </Menu>
          </MHidden>



          <MHidden width="mdUp">
            <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={navConfig} />
          </MHidden>
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
