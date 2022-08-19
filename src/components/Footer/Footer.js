import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { NavLink, useLocation } from 'react-router-dom';

import './Footer.scss';

const pages = [
  {name:"FAQ", path:"/faq"},
  {name:"A propos", path:"/a-propos"},
  {name:"Mentions légales", path: "/mentions-legales"},
  {name:"Politique des cookies", path: "/cookies"}, 
];

function Copyright() {
  return (
    <Typography variant="body2" color="white"  sx={{fontFamily:'Montserrat'}}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Livres O'Trésor
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer() {
  const { pathname } = useLocation();
  if (pathname === "/connexion-parent") return null;
  return (
      <Box
        className="footer"
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
        }}
      >
        <Container maxWidth="sm">
          <Box className='footer-text' sx={{ flexGrow: 1, display: { xs: 'flex-direction:column', md: 'flex' }}}>
            {pages.map((page) => (
              <Typography key={page.name} sx={{ my: 2, color: 'white',fontFamily:'Montserrat', display: 'block', mr: 2 }} >
                <NavLink 
                  to={page.path}
                  className={({ isActive }) => (isActive ? 'footer-link footer-link--active' : 'footer-link')}
                  style={{ textDecoration: 'none', color: 'white'}}
                >
                  {page.name}
                </NavLink>
              </Typography>
            ))}
          </Box>
          <Copyright />
        </Container>
      </Box>
  );
}