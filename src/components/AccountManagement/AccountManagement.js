import React , { useEffect, useState } from 'react'

import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Avatar from '@mui/material/Avatar';
import { Box, Typography, TextField, Card, Grid } from '@mui/material';
import AccountM from './AccountM/AccountM';
import Validate from './Validate/Validate';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'

import {  Link } from 'react-router-dom';

import Loading from '../Loading/Loading';

import './AccountManagement.scss';

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

function AccountManagement() {

    // Redux-toolkit state import
  const apiUrl = useSelector((state) => state.api.apiUrl);

  const token = useSelector((state) => state.user.token);
  const id = useSelector((state) => state.user.userId);
  const firstname = useSelector((state) => state.user.firstname);
  const lastname = useSelector((state) => state.user.lastname);
  const email = useSelector((state) => state.user.email);


  // Local States
  const [KidsValue, setKidsValue] = useState([]);
  const [loadinKidsValue, setLoadingKidsValue] = useState(true);
 

  // Controlled components
  const [kidAddUsernameValue, setKidAddUsernameValue] = useState("");
  const [kidAddPasswordValue, setKidAddPasswordValue] = useState("");
  const [kidAddFirstNameValue, setKidAddFirstNameValue] = useState("");

  // Error states
  const [alertErrorSubmit, setAlertErrorSubmit] = useState(false);
  const [alertErrorLogin, setAlertErrorLogin] = useState(false);

   // Api Calls
   const apiEndpointKids = `/api/v1/users/${id}/kids`
  /////  TODO: ajouter un prénom pour le compte kid en plus du username (car pénible pour associer un compte sans l'appeler papillon 375)=> faire en back
  // TODO : Pour toute modification des comptes utilisateurs adultes: demander la confirmation du mot de passe *//
    // TODO si perte mot de passe=> procédure de renvoi de mail.
  // TODO Permettre la route pour la suppression de l'utilisateur
    // TODO : mettre une alerte de confirmation de suppression car action définitive et irréversible
  // TODO Permettre la route pour suppression d'un kid
    // TODO : mettre une alerte de confirmation de suppression car action définitive et irréversible

  
    
 
//  GET List of users
   useEffect(() => {
     if(id){
     axios.get(apiUrl + apiEndpointKids, {headers : {
       'Authorization': `Bearer ${token}`
     }
     })
     .then((response) => {
       console.log(response.data)
       setKidsValue(response.data);
        console.log(KidsValue);
        setLoadingKidsValue(false)
     })
     .catch((error) => {
       console.log('Erreur !', error);
     })
     
   }
   }, [id]);
   
   if (loadinKidsValue ) {
     return <Loading/>
   }
// ***************Set Datas for Create a Kid**************************

 // Api Call
 const postApi = (routeApi ,data) => {
  axios.post(routeApi , data, {headers : {
    'Authorization': `Bearer ${token}`
  },
  })
  .then(function (response) {
   
   
  })
  // })
  .catch(function (error) {
    console.log(error);
    setAlertErrorLogin(true)
  });
}
   const apiEndpoint = `/api/v1/users/${id}/kids`
  
   const handleSubmit = () => {
     
      const profilUser = {
        username: kidAddUsernameValue,
        password: kidAddPasswordValue,
        firstname: kidAddFirstNameValue
      };
       const profilUserJson = JSON.stringify(profilUser);
     postApi(apiUrl + apiEndpoint,profilUserJson);


     
   };
// **************************************************************
  return (
    <ThemeProvider theme={theme}>
      <div>
          <Box sx={{display:'flex', alignItems:'start', flexDirection:'column' , Width:'100%' }}>
            <Box sx={{margin:'auto', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', mt:'20px'}}>
              <Avatar className='loginAvatar' sx={{ m: 1 }}>
                  <AutoStoriesIcon />
              </Avatar>
              <Typography component="h1" variant="h3" sx={{fontFamily:'montserrat', color:'#4462A5'}}>
                  Réglages
              </Typography>
            </Box>
            <Card variant='outlined' sx={{border:'1px solid #4462A5', marginBottom:'30px', marginTop:'30px', marginLeft:'20px', width:'300px'}}>
              <Typography sx={{fontSize: '1.4rem', padding:'15px', fontFamily: 'montserrat', margin:'auto', color:'white', background:'#4462A5'}}>Informations du compte</Typography>
            </Card>
            <Box sx={{display:'flex', justifyContent:'space-around', alignItems:'center', width: '100%'}}>
              <Card variant='outlined' sx={{border:'1px solid #4462A5', marginBottom:'30px', marginTop:'30px', marginLeft:'20px', width:'70%'}}>
                <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start', Width:'100%', padding:'10px', gap:'10px'}}>
                  <Box sx={{display:'flex', flexDirection:{xs:'column', md:'row'}, Width:'100%', justifyContent:'space-around', gap:'10px' }}>
                    
                    <Grid item xs={12} sm={6} >
                        <TextField
                          fullWidth
                          defaultValue={email}
                          id="email"
                          label="email"
                          name="email"
                          autoComplete="email"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          defaultValue={firstname}
                          autoComplete="given-name"
                          name="firstName"
                          fullWidth
                          label= "Nom"
                          autoFocus
                        />
                      </Grid>
                  </Box>
                  <Box sx={{display:'flex', flexDirection:{xs:'column', md:'row'}, justifyContent:'space-around', Width:'100%', marginBottom:'20px', gap:'10px'}}>
                    
                      <Grid item xs={12} sm={6}>
                        <TextField
                        fullWidth
                        
                        name="password"
                        label="Mot de passe"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          defaultValue={lastname}
                          label= "pseudonyme"
                          name="lastName"
                          autoComplete="family-name"
                        />
                      </Grid>
                  </Box>
                </Box>
              </Card>
              <AccountM />
            </Box>
            <Card variant='outlined' sx={{border:'1px solid #4462A5', marginBottom:'30px', marginTop:'30px', marginLeft:'20px', width:'300px'}}>
              <Typography sx={{fontSize: '1.4rem', padding:'15px', fontFamily: 'montserrat', color:'white', background:'#4462A5'}}>Comptes enfants</Typography>
            </Card>
{/* KID CARD to edit***** */}
            {KidsValue.map((e) => (
            <Box sx={{display:'flex', justifyContent:'space-around', alignItems:'center', width: '100%'}}>
              <Card variant='outlined' sx={{border:'1px solid #4462A5', marginBottom:'30px', marginTop:'30px', marginLeft:'20px', width:'70%'}}>
                <Box sx={{display:'flex', flexDirection:{xs:'column', md:'row'}, justifyContent:'space-around', textAlign:'center', Width:'100%', padding:'10px', gap:'10px' }}>
                <Typography sx={{fontSize: '1.4rem', padding:'30px', fontFamily: 'montserrat'}}> {e.firstname} </Typography>

                  <Box sx={{display:'flex', Width:'100%', justifyContent:'space-around', mt:'18px' }}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="given-name"
                            defaultValue = {e.firstname}
                            // defaultValue = "Valeur a recuperer du back"
                            name="firstName"
                            fullWidth
                            label="Nom du compte *"
                            autoFocus
                            />
                      </Grid>
                  </Box>

                  <Box sx={{display:'flex', justifyContent:'space-around', Width:'100%', marginBottom:'20px', mt:'18px'}}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                        autoComplete="kid-username"
                        defaultValue = {e.username}
                        name="kid-username"
                        fullWidth
                        label="Identifiant de connexion-optionnel"
                        autoFocus
                        />
                      </Grid>
                  </Box>
                     

                  <Box sx={{display:'flex', justifyContent:'space-around', Width:'100%', marginBottom:'20px', mt:'18px'}}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                        autoComplete="new-password"
                        // placeholder = " "
                        name="password"
                        fullWidth
                        label="Mot de passe-optionnel"
                        autoFocus

                        type="password"

                        />
                      </Grid>
                  </Box>
                </Box>
              </Card>
              <AccountM />
            </Box>
             ))}
{/* ***** */}

          
            <Card variant='outlined' sx={{border:'1px solid #4462A5', marginBottom:'30px', marginTop:'30px', marginLeft:'20px', width:'300px'}}>
              <Typography sx={{fontSize: '1.4rem', padding:'15px', fontFamily: 'montserrat', color:'white', background:'#4462A5'}}>Créer un nouveau profil</Typography>
            </Card>
{/* KID CARD to add ***** */}
            <Box sx={{display:'flex', justifyContent:'space-around', alignItems:'center', width: '100%'}}>
              <Card variant='outlined' sx={{border:'1px solid #4462A5', marginBottom:'30px', marginTop:'30px', marginLeft:'20px', width:'70%'}}>
              <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start', Width:'100%', padding:'10px', gap:'10px' }}>
               



                  <Box sx={{display:'flex', Width:'100%', justifyContent:'space-around', borderBlockColor:'red' }}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            label='Prénom'
                            autoFocus
                            value={kidAddFirstNameValue}
                            onChange={(e)=> setKidAddFirstNameValue(e.target.value)}
                            />
                      </Grid>
                  </Box>
                  <Box sx={{color:'blue'}}>
                    Si vous souhaitez donner les accès pour que votre enfant puisse se connecter depuis l'accueil en autonomie, vous pouvez renseigner son identifiant et son mot de passe.
                     Vous serez la seule personne pouvant modifier son identifiant ou son mot de passe. Vous pourrez modifier votre choix après la création de son compte.

                  </Box>

                  <Box sx={{display:'flex', Width:'100%', justifyContent:'space-around' }}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                        autoComplete="kid-username"
                        name="kid-username"
                        fullWidth
                        label="Identifiant de connexion"
                        autoFocus
                        value={kidAddUsernameValue}
                        onChange={(e)=> setKidAddUsernameValue(e.target.value)}

                        />
                      </Grid>
                  </Box>

                  <Box sx={{display:'flex', justifyContent:'space-around', Width:'100%', marginBottom:'20px'}}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                        fullWidth
                        name="password"
                        label="Mot de passe"
                        type="password"
                        autoComplete="new-password"
                        value={kidAddPasswordValue}
                        onChange={(e)=> setKidAddPasswordValue(e.target.value)}
                        />
                      </Grid>
                  </Box>
                  <p>
              (*) Les champs marqués d'un astérix sont obligatoires

                </p>
                </Box>
              </Card>
             
                <Validate handleSubmit={handleSubmit}/>
             
            </Box>
{/* ***** */}

          </Box>
      </div>
    </ThemeProvider>
  )
}

export default AccountManagement