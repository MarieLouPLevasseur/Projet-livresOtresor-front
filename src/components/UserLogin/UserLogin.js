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
import { userLastname, userLogin, userId, userFirstname, userEmail } from '../../features/login/userSlice';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Modal from '@mui/material/Modal';

import { useNavigate } from 'react-router-dom';

import Loading from '../Loading/Loading';
import './UserLogin.scss';
import Image from '../../assets/img/userlogin2.jpg';
import { useTogglePasswordVisibility } from '../../components/useTogglePasswordVisibility';
import OpenEye from '../../assets/img/oeil_ouvert.png';
import CloseEye from '../../assets/img/oeil_ferme.png';
import Spinner from '../Loading/Spinner';


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
  palette: {
    primary: {
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

  // spinner
  const [loading, setLoadingSpinner] = useState(false);


  // Api url
  const apiUrl = useSelector((state) => state.api.apiUrl);
  const apiLoginEndpoint = "/api/v1/login/user"
  const apiResetPasswordEndpoint = "/api/v1/resetPassword"

  // Redux-toolkit state import
  const dispatch = useDispatch()

  // Redirect when connected
  const navigate = useNavigate();


  // Controlled components
  const [emailValue, setEmail] = useState("");
  const [passwordValue, setPassword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [emailToResetPassword, setEmailToResetPassword] = useState("");
  const [loadingData, setLoadingData] = useState(false);


  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
  useTogglePasswordVisibility();


  // Error/Succes states
  const [alertErrorSubmit, setAlertErrorSubmit] = useState(false);
  const [alertErrorLogin, setAlertErrorLogin] = useState(false);
  const [alertErrorReset, setAlertErrorReset] = useState(false);
  const [alertSuccessReset, setAlertSuccessReset] = useState(false);


  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (loggedUser) {
      navigate("/profil/utilisateur");
    }
  });

  //****** MODAL ***********

  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  // ****  Api Call ******
  // Login
  const postApiLogin = (routeApi, data) => {
    setLoadingSpinner(true); 

    axios.post(routeApi, data, {
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(function (response) {
        console.log(response.data);
        const { token } = response.data;


        const { id, firstname, lastname, email } = response.data.user;
        console.log(id, firstname, lastname, email);
        localStorage.setItem('user', JSON.stringify({
          token,
          id,
          firstname,
          lastname,
          email
        }));
        dispatch(userLogin(token))
        dispatch(userId(id))
        dispatch(userFirstname(firstname))
        dispatch(userLastname(lastname))
        dispatch(userEmail(email))
      })
      .catch(function (error) {
        console.log(error);
        setAlertErrorLogin(true)
      })
      .finally(() => {
        setLoadingSpinner(false); 
      });
  }
  // Reset PAssword

  const postApiReset = (routeApi, data) => {
    axios.post(routeApi, data, {
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(function (response) {
        console.log(response);
        setAlertSuccessReset(true)
        setOpenModal(false)
        setLoadingData(false)

      })
      .catch(function (error) {
        console.log(error);
        setAlertErrorReset(true)
        setLoadingData(false)
      });
  }

  // ******** HANDLE **********

  const handleSubmitResetPassword = (routeApi, data) => {

    if (emailToResetPassword === "" ) {
      setAlertErrorSubmit(true);
    } else {
      const userMail = {
        email: emailToResetPassword
      };
      setLoadingData(true)
      const userMailJson = JSON.stringify(userMail);
      postApiReset(apiUrl + apiResetPasswordEndpoint, userMailJson)
    }

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (emailValue === "" || passwordValue === "") {
      setAlertErrorSubmit(true);
    } else {
      const profilUser = {
        username: emailValue,
        password: passwordValue,
      };
      const profilUserJson = JSON.stringify(profilUser);
      postApiLogin(apiUrl + apiLoginEndpoint, profilUserJson)
    }
  };
  if (loadingData) {
    return <Loading />
  }
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={7}

          sx={{
            backgroundImage: `url(${Image})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={12} md={12} lg={5} component={Paper} elevation={6} square>
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
                type={passwordVisibility ? "password" : ""}
                id="password"
                autoComplete="current-password"
                value={passwordValue}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img edge="end" alt={rightIcon === "eye" ? "Set password visible" : "set password invisible"} src={rightIcon === "eye" ? OpenEye : CloseEye} size={22} onClick={handlePasswordVisibility} />

              <Button
                className='loginButton'
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2, backgroundColor: '#4462A5' }}
                disabled={loading} 
              >
                {loading ? (
                  <div className="spinner" /> 
                ) : (
                  'S\'identifier'
                )}
              </Button>
            
              <Grid container>
                <Grid item xs>
                  <Link href="/inscription" underline="hover" variant="body2" fontFamily={'Montserrat'} color="#768fd7">
                    {"Pas encore de compte ? Inscrivez-vous"}
                  </Link>
                </Grid>

                <Grid item xs={12}>

                  <Button sx={{
                    textTransform: "initial"
                  }}
                    onClick={handleOpen}
                  >
                    Mot de passe oublié? Envoyez moi un nouveau mot de passe.</Button>
                  <Modal
                    open={openModal}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                  >
                    <Box sx={{
                      width: 400,
                      backgroundColor: 'white',
                      margin: 'auto',
                      alignContent: 'center'
                    }}
                    >

                      <h2 id="parent-modal-title"> Oubli du mot de passe?</h2>
                      <p className="parent-modal-description">
                        Si vous avez oublié votre mot de passe, il vous suffit d'entrer votre email ici. Nous vous enverrons un nouveau mot de passe sur cette adresse, si elle existe.
                      </p>
                      <Box component="form" noValidate 
                        sx={{
                          margin: 10
                        }}
                      >

                        <TextField
                          value={emailToResetPassword}
                          placeholder="Email de votre compte"
                          onChange={(e) => setEmailToResetPassword(e.target.value)}
                        >
                        </TextField>
                        <Button
                          className="ResetPasswordButton"
                          // type="submit"
                          fullWidth
                          variant="contained"
                          onClick={handleSubmitResetPassword}
                          sx={{ mt: 2, mb: 2, background: '#4462A5' }}
                        >
                          Envoyer un nouveau mot de passe
                        </Button>
                      </Box>
                    </Box>
                  </Modal>
                </Grid>

              </Grid>
              <AnotherFooter sx={{ mt: 5 }} />
              <Copyright sx={{ mt: 2 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* ***** ALERT ERROR********** */}
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

      <Snackbar
        open={alertErrorReset}
        autoHideDuration={6000}
        onClose={() => setAlertErrorReset(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="error"
          sx={{ width: "100%",
          display: 'block',
          textAlign: "center",
          marginBottom:'40%'
          }}
        >
        <p>Une erreur s'est produite lors de l'envoi.</p>
        <p>Merci de renouveler votre demande.</p>
        <p>Si l'erreur persiste, contactez-nous</p>
        </MuiAlert>
      </Snackbar>

      {/******** ALERT SUCCESS ************/}
      <Snackbar
        open={alertSuccessReset}
        autoHideDuration={7000}
        onClose={() => setAlertSuccessReset(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
          sx={{ width: "100%",
          display: 'block',
          textAlign: "center",
          marginBottom:'60%'
          }}
        >
        <p>Votre demande a bien été prise en compte.</p> <p>Si l'adresse mail existe, vous y recevrez un nouveau mot de passe pour vous connecter à nouveau sur le site.</p>
        </MuiAlert>
      </Snackbar>
    </ThemeProvider>
  );
}