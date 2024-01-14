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
import { kidLogin, kidId, kidUsername, kidAvatar, kidFirstname } from '../../features/login/kidSlice';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Modal from '@mui/material/Modal';


// import Image from '../../../src/assets/img/kidlogin.jpg';
import Children from '../../../src/assets/img/children-connexion.png';
import './KidLogin.scss';
import OpenEye from '../../assets/img/oeil_ouvert.png';
import CloseEye from '../../assets/img/oeil_ferme.png';
import { useTogglePasswordVisibility } from '../../components/useTogglePasswordVisibility';
import Spinner from '../Loading/Spinner';


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

    // spinner
    const [loading, setLoadingSpinner] = useState(false);

  // Redux-toolkit state import
  const apiUrl = useSelector((state) => state.api.apiUrl);

  const dispatch = useDispatch()

  // Redirect when connected
  const navigate = useNavigate();

  // Controlled components
  const [userNameValue, setUserName] = useState("");
  const [passwordValue, setPassword] = useState("");
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
  useTogglePasswordVisibility();
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };


  // Error states
  const [alertErrorSubmit, setAlertErrorSubmit] = useState(false);
  const [alertErrorLogin, setAlertErrorLogin] = useState(false);

  useEffect(() => {
    const loggedKid = JSON.parse(localStorage.getItem('kid'));
    if (loggedKid) {
      // setTimeout(() => {
      navigate("/profil/enfant");
    // }, 1000)
  }});

  // Api Call
  const postApi = (routeApi ,data) => {

    setLoadingSpinner(true);

    axios.post(routeApi , data, {headers : {
      "Content-Type": "application/json"
    },
    })
    .then(function (response) {
      console.log(response.data);
      const { token } = response.data;
      const { id, username, profil_avatar,firstname } = response.data.user;
      console.log(id, username, profil_avatar,firstname);
      localStorage.setItem('kid', JSON.stringify({
        token,
        id,
        username,
        profil_avatar,
        firstname
      }));
      dispatch(kidLogin(token))
      dispatch(kidId(id))
      dispatch(kidUsername(username))
      dispatch(kidFirstname(firstname))
      dispatch(kidAvatar(profil_avatar))
    })
    .catch(function (error) {
      console.log(error);
      setAlertErrorLogin(true)
    })
    .finally(() => {
      setLoadingSpinner(false); 
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
          xs={12}
          sm={12}
          md={12}
          lg={7}
          // rowSpacing
          sx={{
            backgroundImage: `url(${Children})`,
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
                id="password"
                autoComplete="current-password"
                value={passwordValue}
                type={passwordVisibility ? "password" : ""}

                onChange={(e) => setPassword(e.target.value)}
              />
               <img edge="end" alt={rightIcon === "eye"? "Set password visible":"set password invisible"} src={rightIcon === "eye" ? OpenEye : CloseEye} size={22} onClick={handlePasswordVisibility} />

              <Button
                className="loginButton"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2, background:'#4462A5' }}
              >
                {loading ? (
                  <div className="spinner" /> 
                ) : (
                  'S\'identifier'
                )}
              </Button>
              <Grid container>
                <Grid item xs={12}>
                  <Link href="/inscription" variant="body2" underline='hover' color='#768fd7' >
                    Pas encore de compte ? Inscrivez-vous
                  </Link>
                 
                </Grid>
                <Grid item xs={12}>
                
                    <Button sx={{
                                textTransform:"initial"
                                }}
                          onClick={handleOpen}
                    >    
                           Oups, j'ai oublié mon mot de passe... Envoyez moi un nouveau mot de passe</Button>
                    <Modal
                      open={openModal}
                      onClose={handleClose}
                      aria-labelledby="parent-modal-title"
                      aria-describedby="parent-modal-description"
                    >
                      <Box sx={{ width: 400,
                          backgroundColor:'white',
                          margin:'auto',
                          alignContent:'center'
                          }}
                      >
                        
                        <h2 id="parent-modal-title"> Oubli du mot de passe?</h2>
                        <p className="parent-modal-description">
                            Si tu as oublié ton mot de passe, il faut que tu demandes à tes parents de te le donner (ou de t'en créer un nouveau) depuis leur espace parent. 
                            </p>
                            <p className="parent-modal-description"> 
                            Passe une belle journée!
                        </p>                       
                      </Box>
                    </Modal>
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