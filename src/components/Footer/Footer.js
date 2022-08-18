import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

import './Footer.scss';

const pages = [
  {name:"FAQ", path:"/faq"},
  {name:"A propos", path:"/a-propos"},
  {name:"Mentions légales", path: "/mentions-legales"},
  {name:"Politique des cookies", path: "/politique-cookies"}, 
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

export default function StickyFooter() {
  return (
      <Box
        className="footer"
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: 
          (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">

          </Typography>
          <Box className='footer-text' sx={{ flexGrow: 1, display: { xs: 'flex-direction:column', md: 'flex' }}}>
            {pages.map((page) => (
              // <Button
              //   key={page.name}
              //   sx={{ my: 2, color: 'white', display: 'block' ,fontFamily:'Montserrat'}}
              // >
              //   {page.name}
              // </Button>
              <Link to={page.path} key={page.name} style={{ textDecoration: 'none', color: 'white'}}>
                <Typography sx={{fontFamily: 'Montserrat'}} textAlign="center" >{page.name}</Typography>
              </Link>
            ))}
          </Box>
          <Copyright />
        </Container>
      </Box>
  );
}