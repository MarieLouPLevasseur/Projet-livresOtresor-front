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
import { userLastname, userLogin, userId , userFirstname } from '../../features/login/userSlice';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';


import './UserLogin.scss';
import Image from '../../assets/img/userlogin2.jpg';


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
      main: '#768fd7',
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

export default function UserLogin() {
  // Api base url
  const apiUrl = useSelector((state) => state.api.apiUrl);

  // Redux-toolkit state import
  const dispatch = useDispatch()

    // Redirect when connected
    const navigate = useNavigate();


  // Controlled components
  const [emailValue, setEmail] = useState("");
  const [passwordValue, setPassword] = useState("");

  // Error states
  const [alertErrorSubmit, setAlertErrorSubmit] = useState(false);
  const [alertErrorLogin, setAlertErrorLogin] = useState(false);


  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (loggedUser) {
      navigate("/profil/utilisateur");
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

    

      // **************
      // TODO modifier les constantes de stockage du User en créant les variables: kidId kidAvatar et kidUsername 
        // TODO ces variables ne seront pas stocker à la connexion mais sur la page Homage User lors du clique pour voir un compte enfant
      const { id, firstname, lastname } = response.data.user;
      console.log(id, firstname, lastname);
      localStorage.setItem('user', JSON.stringify({
        token,
        id,
        firstname,
        lastname,
      }));
      dispatch(userLogin(token))
      dispatch(userId(id))
      dispatch(userFirstname(firstname))
      dispatch(userLastname(lastname))
    })
      // ************
    // })
    .catch(function (error) {
      console.log(error);
      setAlertErrorLogin(true)
    });
  }

  const apiEndpoint = "/api/v1/login/user"

  const handleSubmit = (event) => {
    event.preventDefault();
    if (emailValue === "" || passwordValue === "" ) {
      setAlertErrorSubmit(true);
    } else {
    const profilUser = {
      username: emailValue,
      password: passwordValue,
    };
    const profilUserJson = JSON.stringify(profilUser);
    postApi(apiUrl + apiEndpoint,profilUserJson)
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
              Connexion Parent
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                className='loginField'
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={emailValue}
                onChange={(e) => setEmail(e.target.value)}
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
                className='loginButton'
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2, backgroundColor: '#4462A5' }}
              >
                S'identifier
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/inscription" underline="hover" variant="body2" fontFamily={'Montserrat'} color="#768fd7">
                    {"Pas encore de compte ? Inscrivez-vous"}
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