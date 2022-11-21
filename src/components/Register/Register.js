import React, { useEffect } from 'react';
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
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import IconButton from '@mui/material/IconButton';
// import { Icon, SvgIcon } from '@mui/material';
import Loading from '../Loading/Loading';
import Checkbox from '@mui/material/Checkbox';



// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { useFormControl } from '@mui/material/FormControl';
import { useTogglePasswordVisibility } from '../../components/useTogglePasswordVisibility';


import OpenEye from '../../assets/img/oeil_ouvert.png';
import CloseEye from '../../assets/img/oeil_ferme.png';
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
  palette: {
    primary: {
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

  // Api base url
  const apiUrl = useSelector((state) => state.api.apiUrl);

  // controlled components
  const [firstNameValue, setFirstName] = useState("");
  const [lastNameValue, setLastName] = useState("");
  const [emailValue, setEmail] = useState("");
  const [passwordValue, setPassword] = useState("");
  const [verifiedPasswordValue, setVerifiedPasswordValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();


  // error control
  const [emailError, setEmailError] = useState(false);
  const [passwordValidityError, setPasswordValidityError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  //alert snackbar control
  const [alertSuccesSubmit, setAlertSuccesSubmit] = useState(false);
  const [alertErrorSubmit, setAlertErrorSubmit] = useState(false);
  const [alertInvalidEmail, setAlertInvalidEmail] = useState(false);
  const [alertInvalidPassword, setAlertInvalidPassword] = useState(false);
  const [alertMatchPassword, setAlertMatchPassword] = useState(false);
  const [alertLegalMention, setAlertLegalMention] = useState(false);

  // Redirect when connected
  const navigate = useNavigate();

  // Verifications
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

  const checkPasswordValidity = () => {
    if (
      passwordValue.match(
        // minimum 8 character: minimum: 1 lowercase, 1 uppercase, 1 special character
        "^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$"

      )
    ) {
      setPasswordValidityError(true);
    } else {
      setPasswordValidityError(false);
    }
  };

  const checkPasswordMatch = () => {
    console.log("------- Password Matchs-----------")

    console.log(passwordValue, " Valeur mot de passe  ")
    console.log(verifiedPasswordValue, " Valeur Vérification mot de passe ")
    console.log(passwordValue === verifiedPasswordValue, " Les mot de passe sont égaux? ")
    if (passwordValue !== verifiedPasswordValue) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  };

  // ! Mettre une page intermédiaire au lieu de rediriger automatiquement: message de prise en compte trop court et redirection non controler par utilisateur
  // Redirect when success
  useEffect(() => {
    if (alertSuccesSubmit) {
      setTimeout(() => {
        navigate("/connexion-parent")
      }, 2000);
    }


  });

  //api call
  const postApi = (routeApi, data) => {
    axios.post(routeApi, data, {
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(function (response) {
        console.log(response);
        setLoading(false);
        setAlertSuccesSubmit(true);

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const apiEndpoint = "/api/v1/registration"

  // HANDLE

  const handleChangeChecked = () => {
    setChecked(!checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(" --------Handle Submit Registration---------------")
    console.log(passwordMatchError, "valeur password Match Error")
    if (emailValue === "" || firstNameValue === "" || lastNameValue === "" || passwordValue === "") {
      setAlertErrorSubmit(true);
    } else if (emailError === true) {
      setAlertInvalidEmail(true)
    } else if (passwordValidityError === true) {
      setAlertInvalidPassword(true)
    } else if (passwordMatchError === true) {
      setAlertMatchPassword(true)
    }else if(checked === false){
      console.log("Mention légale n'a pas été coché")
      setAlertLegalMention(true)
    } else {
      const profilUser = {
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        password: passwordValue,
      };
      setLoading(true);

      const profilUserJson = JSON.stringify(profilUser);
      postApi(apiUrl + apiEndpoint, profilUserJson)
    }


    
  };

 

  if (loading) {
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
        <Grid xs={12} sm={12} md={12} lg={5} component={Paper} elevation={6} square>
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
                    error={emailError}
                    helperText={emailError ? "Email invalide." : ""}
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
                {/* ---------- PASSWORDS ------------*/}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Mot de passe"
                    id="password"
                    autoComplete="new-password"
                    value={passwordValue}
                    // secureTextEntry={passwordVisibility}
                    onBlur={checkPasswordValidity}
                    type={passwordVisibility ? "password" : ""}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                </Grid>
                <Grid item xs={12}>

                  <TextField
                    error={passwordMatchError}
                    helperText={passwordMatchError ? "Les mots de passe ne sont pas concordants" : ""}
                    required
                    fullWidth
                    name="VerifiedPassword"
                    label="Confirmation mot de passe"
                    id="VerifiedPassword"
                    autoComplete="new-password"
                    value={verifiedPasswordValue}
                    // ! le remplissage et correction en temps réel a refaire
                    onBlur={checkPasswordMatch}
                    // !le secureTextEntry ne fonctionne pas (ni majuscule ni minuscule: erreur à revoir)
                    // securetextentry={passwordVisibility}
                    type={passwordVisibility ? "password" : ""}

                    onChange={(e) => setVerifiedPasswordValue(e.target.value)}
                  />
                  <img edge="end" alt={rightIcon === "eye"? "Set password visible":"set password invisible"} src={rightIcon === "eye" ? OpenEye : CloseEye} size={22} onClick={handlePasswordVisibility} />

                </Grid>

                <Grid item xs={12}>
                </Grid>
              </Grid>
                <Checkbox
                required
                // error={!checked}
                // error
                label="My Value"
                value={checked}
                onChange={handleChangeChecked}
              />
              J'ai lu et j'accepte les <Link href="/mentions-legales">Mentions légales </Link> *
              
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

      {/* **** Alert Submissions **** */}
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


      {/* ***** Alert Mail ***** */}
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

      {/* *****  Alert Password ***** */}
      <Snackbar
        open={alertInvalidPassword}
        autoHideDuration={6000}
        onClose={() => setAlertInvalidPassword(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="warning"
          sx={{ width: "100%" }}
        >
          le mot de passe doit contenir: plus de 8 caractères, avoir au moins une lettre minuscule ET majuscule et avoir un caractère spécial ( ! , $ , \ , @ , ...)
        </MuiAlert>
      </Snackbar>

      <Snackbar
        open={alertMatchPassword}
        autoHideDuration={6000}
        onClose={() => setAlertMatchPassword(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="warning"
          sx={{ width: "100%" }}
        >
          La confirmation du mot de passe est invalide
        </MuiAlert>
      </Snackbar>

      <Snackbar
        open={alertLegalMention}
        autoHideDuration={6000}
        onClose={() => setAlertLegalMention(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="warning"
          sx={{ width: "100%" }}
        >
          Vous devez valider les mentions légales pour vous inscrire.
        </MuiAlert>
      </Snackbar>

    </ThemeProvider>
  );
}