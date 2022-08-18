import * as React from 'react';
import { Link, NavLink } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

import './Navbar.scss';

const pages = [
  {name:"Tutoriel", path: "/tutoriel"},
  {name:"S'inscrire", path: "/inscription"},
  {name:"Enfant", path:"/"},
  {name:"Parents", path:"/"},
];
const settings = ['Profil', 'Compte', 'Déconnexion'];

const isLog = false;

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  return (
    <AppBar className='nav' position="static">
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <AutoStoriesIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 2, ml: 10 }} />
            <Link to="/" style={{ textDecoration: 'none', color:'white'}}>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 120,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'Montserrat',
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Livres O'Trésor
              </Typography>
            </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <Link to={page.path} key={page.name} style={{ textDecoration: 'none', color: 'black'}}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <AutoStoriesIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily:'Montserrat',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Livres O'Trésor
          </Typography>
          {!isLog && (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'center' }}}>
              <Button
                className='button'
                onClick={handleCloseNavMenu}
                sx={{ my: 3, color: 'white',fontFamily:'Montserrat', display: 'block', mr: 2 }}
              >
                <NavLink
                  className={({ isActive }) => (isActive ? 'button button--active' : 'button')}
                  style={{ textDecoration: 'none'}}
                  to='/tutoriel'
                >
                  Tutoriel
                </NavLink>
              </Button>
              <Button
                className='button'
                onClick={handleCloseNavMenu}
                sx={{ my: 3, color: 'white',fontFamily:'Montserrat', display: 'block', mr: 2 }}
              >
                <NavLink
                  className={({ isActive }) => (isActive ? 'button button--active' : 'button')}
                  style={{ textDecoration: 'none'}}
                  to='/inscription'
                >
                  S'inscrire
                </NavLink>
              </Button>
              <Button
                className='button'
                onClick={handleCloseNavMenu}
                sx={{ my: 3, color: 'white',fontFamily:'Montserrat', display: 'block', mr: 2 }}
              >
                <NavLink
                  className={({ isActive }) => (isActive ? 'button button--active' : 'button')}
                  style={{ textDecoration: 'none'}}
                  to='/'
                >
                  Enfant
                </NavLink>
              </Button>
              <Button
                className='button'
                onClick={handleCloseNavMenu}
                sx={{ my: 3, color: 'white',fontFamily:'Montserrat', display: 'block', mr: 2 }}
              >
                <NavLink
                  className={({ isActive }) => (isActive ? 'button button--active' : 'button')}
                  style={{ textDecoration: 'none'}}
                  to='/'
                >
                  Parent
                </NavLink>
              </Button>
            </Box>
          )}

          {isLog && (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'flex-end'}, mr: 5}}>
              <Button
                className='button'
                onClick={handleCloseNavMenu}
                sx={{ my: 3, color: 'white',fontFamily:'Montserrat', display: 'block'}}
              >
                <NavLink
                  className={({ isActive }) => (isActive ? 'button button--active' : 'button')}
                  style={{ textDecoration: 'none'}}
                  to='/tutoriel'
                >
                  Tutoriel
                </NavLink>
              </Button>
            </Box>
          )}

          {isLog && (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
