import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
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

  // local state because we need those only here
  // controlled components
  const [firstNameValue, setFirstName] = useState("");
  const [lastNameValue, setLastName] = useState("");
  const [emailValue, setEmail] = useState("");
  const [passwordValue, setPassword] = useState("");


  // error control
  const [emailError, setEmailError] = useState(false);

  //alert snackbar control
  const [alertSuccesSubmit, setAlertSuccesSubmit] = useState(false);
  const [alertErrorSubmit, setAlertErrorSubmit] = useState(false);
  const [alertInvalidEmail, setAlertInvalidEmail] = useState(false)

  const checkEmailValidity = () => {
    if (
      !emailValue.match(
        "^([A-Za-z0-9_\\-\\.]+)@([A-Za-z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$"
      )
    ) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  //api call
  const postApi = (routeApi ,data) => {
    axios.post(routeApi , data, {headers : {
      "Content-Type": "application/json"
    },
    } )
    .then(function (response) {
      console.log(response);
      setAlertSuccesSubmit(true);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const routeApi="http://marie-lou-prince-levasseur.vpnuser.lan:8000/api/v1/users"


  const handleSubmit = (event) => {
    event.preventDefault();
    if (emailValue === "" || firstNameValue === "" || lastNameValue === "" || passwordValue === "" ) {
      setAlertErrorSubmit(true);
    } else if (emailError === true) {
      setAlertInvalidEmail(true)
    } else {
    const profilUser = {
      firstName: firstNameValue,
      lastName: lastNameValue,
      email: emailValue,
      password: passwordValue,
    };
    const profilUserJson = JSON.stringify(profilUser);
    postApi(routeApi,profilUserJson)
    }
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
                  value={firstNameValue}
                  onChange={(e) => setFirstName(e.target.value)}
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
                  value={lastNameValue}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={ emailError }
                  helperText={ emailError ? "Email invalide." : "" }
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  onBlur={checkEmailValidity}
                  value={emailValue}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={passwordValue}
                  onChange={(e) => setPassword(e.target.value)}
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
      <Snackbar
        open={alertSuccesSubmit}
        autoHideDuration={6000}
        onClose={() => setAlertSuccesSubmit(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
          sx={{ width: "100%" }}
        >
          Inscription réussie !
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={alertErrorSubmit}
        autoHideDuration={6000}
        onClose={() => setAlertErrorSubmit(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="error"
          sx={{ width: "100%" }}
        >
          Inscription incomplète : Merci de remplir tous les champs
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={alertInvalidEmail}
        autoHideDuration={6000}
        onClose={() => setAlertInvalidEmail(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="warning"
          sx={{ width: "100%" }}
        >
          Adresse Email invalide !
        </MuiAlert>
      </Snackbar>
    </ThemeProvider>
  );
}