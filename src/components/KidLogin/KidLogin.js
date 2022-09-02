import * as React from 'react';
import axios from 'axios';
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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { kidLogin, kidId, kidUsername, kidAvatar } from '../../features/login/kidSlice';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Image from '../../../src/assets/img/kidlogin.jpg';
import './KidLogin.scss';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Livres O'Trésor
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
function AnotherFooter(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      <Link color="inherit" underline='hover' href="/faq">
        FAQ
      </Link>{' | '}
      <Link color="inherit" underline='hover' href="/a-propos">
        A propos
      </Link>{' | '}
      <Link color="inherit" underline='hover' href="/mentions-legales">
        Mentions légales
      </Link>{' | '}
      <Link color="inherit" underline='hover' href="/cookies">
        Politique des cookies
      </Link>
    </Typography>
  );
}

const theme = createTheme({
  palette:{
    primary:{
      main: '#768fd7',
    }
  },
  typography: {
    fontFamily: [
      'Montserrat'
    ]
  }
});

export default function KidLogin() {

  // Redux-toolkit state import
  const apiUrl = useSelector((state) => state.api.apiUrl);

  const dispatch = useDispatch()

  // Redirect when connected
  const navigate = useNavigate();

  // Controlled components
  const [userNameValue, setUserName] = useState("");
  const [passwordValue, setPassword] = useState("");

  // Error states
  const [alertErrorSubmit, setAlertErrorSubmit] = useState(false);
  const [alertErrorLogin, setAlertErrorLogin] = useState(false);

  useEffect(() => {
    const loggedKid = JSON.parse(localStorage.getItem('kid'));
    if (loggedKid) {
      navigate("/profil/enfant");
    }
  });

  // Api Call
  const postApi = (routeApi ,data) => {
    axios.post(routeApi , data, {headers : {
      "Content-Type": "application/json"
    },
    })
    .then(function (response) {
      console.log(response.data);
      const { token } = response.data;
      const { id, username, profile_avatar } = response.data.user;
      console.log(id, username, profile_avatar);
      localStorage.setItem('kid', JSON.stringify({
        token,
        id,
        username,
        profile_avatar,
      }));
      dispatch(kidLogin(token))
      dispatch(kidId(id))
      dispatch(kidUsername(username))
      dispatch(kidAvatar(profile_avatar))
    })
    .catch(function (error) {
      console.log(error);
      setAlertErrorLogin(true)
    });
  }

  const apiEndpoint = "/api/v1/login/kid"
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (userNameValue === "" || passwordValue === "" ) {
      setAlertErrorSubmit(true);
    } else {
    const profilUser = {
      username: userNameValue,
      password: passwordValue,
    };
    const profilUserJson = JSON.stringify(profilUser);
    postApi(apiUrl + apiEndpoint,profilUserJson);
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
            <Avatar className='loginAvatar' sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <AutoStoriesIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Connexion Enfant
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="identifiant"
                label="Identifiant"
                name="Identifiant"
                autoComplete="current-identifiant"
                autoFocus
                value={userNameValue}
                onChange={(e) => setUserName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
                value={passwordValue}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                className="loginButton"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2, background:'#4462A5' }}
              >
                S'identifier
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/inscription" variant="body2" underline='hover' color='#768fd7' >
                    Pas encore de compte ? Inscrivez-vous
                  </Link>
                </Grid>
              </Grid>
              <AnotherFooter sx={{ mt: 5 }}/>
              <Copyright sx={{ mt: 2 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
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
          La connexion a échouée : Merci de remplir tous les champs
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={alertErrorLogin}
        autoHideDuration={6000}
        onClose={() => setAlertErrorLogin(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="error"
          sx={{ width: "100%" }}
        >
          La connexion a échouée : Identifiants incorrects
        </MuiAlert>
      </Snackbar>
    </ThemeProvider>
  );
}