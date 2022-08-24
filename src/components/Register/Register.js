import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './Register.scss';
import Image from '../../assets/img/register.jpg';


function Copyright(props) {
  return (
    <Typography variant="body2" fontFamily={'Montserrat'} color="text.secondary" align="center" {...props}>    
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Livres O'Trésor
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
  palette:{
    primary:{
      main: '#4462A5',
    }
  },
  typography: {
    fontFamily: [
      'Montserrat'
    ]
  }
});

function AnotherFooter(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>    
      <Link color="inherit" underline="hover" href="/faq">
        FAQ
      </Link>{' | '}
      <Link color="inherit" underline="hover" href="/a-propos">
        A propos
      </Link>{' | '}
      <Link color="inherit" underline="hover" href="/mentions-legales">
        Mentions légales
      </Link>{' | '}
      <Link color="inherit" underline="hover" href="/cookies">
        Politique des cookies
      </Link>{' '}
    </Typography>
  );
}

export default function Register() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Image})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar className='loginAvatar' sx={{ m: 1 }}>
              <AutoStoriesIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Inscription
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Prénom"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Nom"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
              </Grid>
            </Grid>
            <Button
              className="loginButton"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              S'inscrire
            </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/connexion-parent" underline="hover" variant="body2" fontFamily={'Montserrat'} color="#768fd7">
                    {"Déja un compte ? Connectez-vous"}
                  </Link>
                </Grid>
              </Grid>
              <AnotherFooter sx={{ mt: 5 }} />
              <Copyright sx={{ mt: 2 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}