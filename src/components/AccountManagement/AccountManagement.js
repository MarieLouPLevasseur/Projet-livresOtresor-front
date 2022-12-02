import React, { useEffect, useState } from 'react'

import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Avatar from '@mui/material/Avatar';
import { Box, Typography, TextField, Card, Grid } from '@mui/material';
// import AccountM from './AccountM/AccountM';
import Validate from './Validate/Validate';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import Fab from '@mui/material/Fab'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// import {  useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { Link } from 'react-router-dom';

import Loading from '../Loading/Loading';
import { userFirstname, userId, userKidAvatar, userKidId, userKidUsername,userKidFirstname, userLastname, userLogin , userEmail} from '../../features/login/userSlice';
import { userLogout } from '../../features/login/userSlice';
import { kidLogout } from '../../features/login/kidSlice';

import './AccountManagement.scss';
import { useTogglePasswordVisibility } from '../../components/useTogglePasswordVisibility';
import OpenEye from '../../assets/img/oeil_ouvert.png';
import CloseEye from '../../assets/img/oeil_ferme.png';
import logoBook from '../../assets/img/logo.3.png';

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

function AccountManagement() {


  // Modal
  const [openModalDeleteKid, setOpenModalDeleteKid] = useState(false);
  const [openModalCheckCredential, setOpenModalCheckCredential] = useState(false);
  const [openModalConfirmDeleteUser, setOpenModalConfirmDeleteUser] = useState(false);
  const [openModalDeleteAccountMessage, setOpenModalDeleteAccountMessage] = useState(false);

  // const [openModalUpdateUser, setOpenModalUpdateUser] = useState(false);

  // Kid
  const [KidsValue, setKidsValue] = useState([]);
  const [loadinKidsValue, setLoadingKidsValue] = useState(true);
  const [kidAddUsernameValue, setKidAddUsernameValue] = useState("");
  const [kidAddPasswordValue, setKidAddPasswordValue] = useState("");
  const [kidAddFirstNameValue, setKidAddFirstNameValue] = useState("");
  const [kidUpdateUsernameValue, setKidUpdateUsernameValue] = useState("");
  const [kidUpdatePasswordValue, setKidUpdatePasswordValue] = useState("");
  const [kidUpdateFirstNameValue, setKidUpdateFirstNameValue] = useState("");
  
  // User
  const token = useSelector((state) => state.user.token);
  const id = useSelector((state) => state.user.userId);
  const [firstname, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loadinUserValue, setLoadingUserValue] = useState(true);
  const [userUpdateEmailValue, setUserUpdateEmailValue] = useState("");
  const [userUpdatePasswordValue, setUserUpdatePasswordValue] = useState("");
  const [userUpdateLastNameValue, setUserUpdateLastNameValue] = useState("");
  const [userUpdateFirstNameValue, setUserUpdateFirstNameValue] = useState("");
  const [changeUpdateUser, setChangeUpdateUser] = useState(false);
  const [changeDeleteUser, setChangeDeleteUser] = useState(false);


  // Others
  const dispatch = useDispatch();
  const [passwordToCheck, setPasswordToCheck] = useState("");
  const [idKidToDelete, setIdKidToDelete] = useState(0);
  const [changeDatas, setChangeDatas] = useState(false);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
  useTogglePasswordVisibility();



  // Error states
  const [alertErrorCreate, setAlertErrorCreate] = useState(false);
  const [alertErrorUpdate, setAlertErrorUpdate] = useState(false);
  const [alertUsernameFailed, setAlertUsernameFailed] = useState(false);
  const [alertErrorDelete, setAlertErrorDelete] = useState(false);
  const [alertErrorCheckCredential, setAlertErrorCheckCredential] = useState(false);

  // Success State
  const [alertSuccessCreate, setAlertSuccessCreate] = useState(false);
  const [alertSuccessUpdate, setAlertSuccessUpdate] = useState(false);
  const [alertSuccessDelete, setAlertSuccessDelete] = useState(false);
  // const [alertSuccessDeleteUser, setAlertSuccessDeleteUser] = useState(false);

  // Api Calls
  const apiUrl = useSelector((state) => state.api.apiUrl);
  const apiEndpointKids = `/api/v1/users/${id}/kids`
  const apiEndpointUsers = `/api/v1/users/${id}`
  const apiEndpointDeleteUser = `/api/v1/users/delete/${id}`

  /////   : ajouter un prénom pour le compte kid en plus du username (car pénible pour associer un compte sans l'appeler papillon 375)=> faire en back
  ///// TODO : Modification des comptes enfants
  ///// TODO mettre une erreur spécifique et parlante en cas d'identifiant déjà utilisé
  ///// TODO mettre à jour l'encart du prénom (ou rechargement page?)

  ///// TODO : Pour toute modification des comptes utilisateurs adultes: demander la confirmation du mot de passe *//
  /////  si perte mot de passe=> procédure de renvoi de mail via l'accueil
  ///// TODO Permettre la route pour la suppression de l'utilisateur
  ///// TODO : mettre une alerte de confirmation de suppression car action définitive et irréversible
  ///// TODO : mettre mot de passe en visible
  ///// TODO : Afficher une page de remerciement/confirmation et déloguer le User avant de rediriger vers l'accueil principale du site
  // TODO : factoriser les Alert et les modals
  // TODO :  créer la barre d'affichage du niveau de sécurité du mot de passe (plutot que l'obligatoire d'un mot de passe avec Regex)
  // TODO : ? ajouter une variable 'checked' lorsque la confirmation du mot de passe a été faites une fois. Cela évitera à l'utilisateur de rentrer sont code 50 fois apres confirmations
    // TODO : ? valider un temps avant la remise à 0 du checked?
  // TODO : mettre un hover au survol des boutons edit, validate et delete
  // TODO : ? Envoyer une confirmation lors du changement de mot de passe par mail?  
  // TODO ?vérifier les contraintes du mot de passe avant soumission?

  ///// TODO : Permettre la route pour suppression d'un kid
  ///// TODO : mettre une alerte de confirmation de suppression car action définitive et irréversible

 


  //  GET List of users
  useEffect(() => {
    if (id) {
      axios.get(apiUrl + apiEndpointKids, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((response) => {
          setKidsValue(response.data);
          setLoadingKidsValue(false)
        })
        .catch((error) => {
          console.log(error);
        })

        axios.get(apiUrl + apiEndpointUsers, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then((response) => {
            setFirstName(response.data.firstname);
            setLastName(response.data.lastname);
            setEmail(response.data.email);
            setLoadingUserValue(false)
          })
          .catch((error) => {
            console.log(error);
          })


        setChangeDatas(false)
    }
  }, [id, changeDatas]);

   //****** MODAL ***********

   const handleOpendeleteKid = (id) => {
    setOpenModalDeleteKid(true);
    setIdKidToDelete(id);
  };
   const handleOpendeleteUser = () => {
    setOpenModalCheckCredential(true);
  };


  const handleClose = () => {
    setOpenModalCheckCredential(false);
    setOpenModalDeleteKid(false);
    setOpenModalConfirmDeleteUser(false);
    setChangeDeleteUser(false);
    setChangeUpdateUser(false);
    setIdKidToDelete(0);

  };
  // *************** Set Datas for Create a Kid**************************

  // Api Call
  const postApi = (routeApi, data) => {
    axios.post(routeApi, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then(function (response) {
        setAlertSuccessCreate(true);
        setChangeDatas(true);
        setKidAddFirstNameValue("");
        setKidAddPasswordValue("");
        setKidAddUsernameValue("");
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.message)
        if (error.message === "Request failed with status code 400"){
          setAlertUsernameFailed(true)
        }
        else{
          setAlertErrorCreate(true)
        }

      });
  }

  const handleSubmitCreate = () => {

    const profilUser = {
      username: kidAddUsernameValue,
      password: kidAddPasswordValue,
      firstname: kidAddFirstNameValue
    };
    const profilUserJson = JSON.stringify(profilUser);
    postApi(apiUrl + apiEndpointKids, profilUserJson);

  };

  // *************** Set Datas for Update a Kid **************************

  // Api Call
  const patchApiUpdate = (routeApi, data) => {
    axios.patch(routeApi, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then(function (response) {
        setAlertSuccessUpdate(true)
        setChangeDatas(true)
        setKidUpdateFirstNameValue("");
        setKidUpdatePasswordValue("");
        setKidUpdateUsernameValue("");
      })
      .catch(function (error) {
        console.log(error);
        
        if (error.message === "Request failed with status code 409"){
          setAlertUsernameFailed(true)
        }
        else{
          setAlertErrorUpdate(true)

        }
      });
  }

  const handleSubmitUpdate = (id) => {
    console.log("-----------je suis dans le handleSubmit Update--------")
    const profilUser = {
      username: kidUpdateUsernameValue,
      password: kidUpdatePasswordValue,
      firstname: kidUpdateFirstNameValue
    };
    const profilUserJson = JSON.stringify(profilUser);
    patchApiUpdate(apiUrl + apiEndpointKids + `/${id}`, profilUserJson);

  };
  // *************** Delete Kid**************************

  // Api Call
  const deleteApiKid = (routeApi) => {
    axios.delete(routeApi, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then(function (response) {
        console.log(response)
        setAlertSuccessDelete(true)
        setChangeDatas(true)

      })
      .catch(function (error) {
        console.log(error);
        
          setAlertErrorDelete(true)

      });
  }

  const handleSubmitDelete = () => {
    console.log("-----------je suis dans le handleSubmit Delete--------")
    console.log(id, "test de 'e'")
  
    deleteApiKid(apiUrl + apiEndpointKids + `/${idKidToDelete}`);
    handleClose();

  };

   // *************** Check Credential User **************************

  // Api Call

  const postApiCheckCredential = (routeApi,data) => {
    axios.post(routeApi,data, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then(function (response) {
        console.log(response)
        console.log(changeUpdateUser === true, "est que j'update un user?")
        console.log(changeDeleteUser === true, "est que je supprime un user?")

        if(changeUpdateUser === true){

          handleSubmitUpdateUser()
        }
        if(changeDeleteUser === true){

          setOpenModalConfirmDeleteUser(true)
        }
      })
      .catch(function (error) {
        console.log(error);
          setAlertErrorCheckCredential(true)

      });
  }

  const handleSubmitCheckCredential = () => {
    console.log("-----------je suis dans le handleSubmit CheckCredential--------")

    const passwordUser = {
      password: passwordToCheck,
    };
    const passwordUserJson = JSON.stringify(passwordUser);
  
    postApiCheckCredential(apiUrl + apiEndpointUsers + '/checkCredential', passwordUserJson);

  };
   // *************** Delete User **************************

    // Api Call
   const deleteApiUser = (routeApi) => {
    axios.delete(routeApi, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then(function (response) {
        console.log(response)
        setOpenModalDeleteAccountMessage(true)

        // logout user
        dispatch(userLogout());
        dispatch(kidLogout())
        localStorage.removeItem('user');
        localStorage.removeItem('kid');
      })
      .catch(function (error) {
        console.log(error);
        
          setAlertErrorDelete(true)

      });
  }

  const handleSubmitDeleteUser = () => {
    console.log("-----------je suis dans le handleSubmit Delete--------")
    console.log(id, "test de 'e'")
  
    deleteApiUser(apiUrl + apiEndpointDeleteUser );
    handleClose();

  };

  // *************** Set Datas for Update a User **************************

  // Api Call
  const patchApiUpdateUser = (routeApi, data) => {
    axios.patch(routeApi, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then(function (response) {
        setAlertSuccessUpdate(true)
        setChangeDatas(true)

        //dispatch Data on Store
        dispatch(userFirstname(userUpdateFirstNameValue? userUpdateFirstNameValue : firstname));
        dispatch(userLastname(userUpdateLastNameValue? userUpdateLastNameValue: lastName));
        dispatch(userEmail(userUpdateEmailValue ? userUpdateEmailValue: email));

        // Erase value on form
        setUserUpdateFirstNameValue("");
        setUserUpdatePasswordValue("");
        setUserUpdateEmailValue("");
        setUserUpdateLastNameValue("");
        handleClose();
      })
      .catch(function (error) {
        console.log(error);     

        setAlertErrorUpdate(true)

      });
  }


  const handleSubmitUpdateUser = () => {
    console.log("-----------je suis dans le handleSubmit Update User--------")
    console.log (userUpdateEmailValue, "update email")
    console.log(userUpdateFirstNameValue, "update firstname")
    console.log(userUpdateLastNameValue, "update lastname")
    console.log(userUpdatePasswordValue, "update password")
    // Without password
    if (userUpdatePasswordValue === ""){
      const updateUserWithoutPassword = {
        lastname: userUpdateLastNameValue === "" ? lastName : userUpdateLastNameValue,
        firstname: userUpdateFirstNameValue === "" ? firstname: userUpdateFirstNameValue,
        email: userUpdateEmailValue === "" ? email : userUpdateEmailValue
      };
      const updateUserWithoutPasswordJson = JSON.stringify(updateUserWithoutPassword);
    patchApiUpdateUser(apiUrl + apiEndpointUsers , updateUserWithoutPasswordJson);
    }
    // with password
    else{

      const updateUserWithPassword = {
        lastname: userUpdateLastNameValue === "" ? lastName : userUpdateLastNameValue,
        // TODO ?vérifier les contraintes du mot de passe avant soumission?
        password: userUpdatePasswordValue,
        firstname: userUpdateFirstNameValue === "" ? firstname: userUpdateFirstNameValue,
        email: userUpdateEmailValue === "" ? email : userUpdateEmailValue
      };
      const updateUserWithPasswordJson = JSON.stringify(updateUserWithPassword);
      patchApiUpdateUser(apiUrl + apiEndpointUsers , updateUserWithPasswordJson);
    }

  };

  // **************************************************************
  if (loadinKidsValue || loadinUserValue) {
    return <Loading />
  }
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Box sx={{ width: { md: '80%' }, border: '1px solid #4462A5', justifyContent: 'space-between', alignItems: 'center', margin: 'auto' }}>

          <Box sx={{ display: 'flex', alignItems: 'start', flexDirection: 'column', Width: '100%' }}>
            <Box sx={{ margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt: '20px' }}>
              <Avatar className='loginAvatar' sx={{ m: 1 }}>
                <AutoStoriesIcon />
              </Avatar>
              <Typography component="h1" variant="h3" sx={{ fontFamily: 'montserrat', color: '#4462A5' }}>
                Réglages
              </Typography>

              {/* User Card informations */}
              <Card  variant='outlined' sx={{ border: '1px solid #4462A5', marginBottom: '30px', marginTop: '30px', marginLeft: '20px', width: '40%' }}>

                <Typography sx={{ fontSize: '1.4rem', padding: '15px', fontFamily: 'montserrat', margin: 'auto', color: 'white', background: '#4462A5' }}>Informations du compte parent</Typography>
              </Card>
              <Box  sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
                <Card variant='outlined' sx={{ border: '1px solid #4462A5', marginBottom: '30px', marginTop: '30px', marginLeft: '20px', width: '70%' }}>
                  <Box sx={{ display: 'flex', flexDirection: {xs:'column', lg:"row"}, justifyContent: 'flex-start', Width: '100%', padding: '10px', gap: '10px' }}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, Width: '100%', justifyContent: 'space-around', gap: '10px' }}>

                      <Grid item xs={12} sm={6} >
                        <TextField
                          fullWidth
                          defaultValue={email}
                          id="email"
                          label="email"
                          name="email"
                          autoComplete="email"
                          onChange={(e) => setUserUpdateEmailValue(e.target.value)}

                        />
                      </Grid>
                      <Grid item xs={12} sm={6} >
                        <TextField
                          defaultValue={firstname}
                          autoComplete="given-name"
                          name="firstName"
                          fullWidth
                          label="Nom"
                          autoFocus
                          onChange={(e) => setUserUpdateFirstNameValue(e.target.value)}

                        />
                      </Grid>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-around', Width: '100%', marginBottom: '20px', gap: '10px' }}>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          defaultValue={userUpdatePasswordValue}
                          name="password"
                          label="Mot de passe"
                          // type="password"
                          id="password"
                          autoComplete="new-password"
                          onChange={(e) => setUserUpdatePasswordValue(e.target.value)}

                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          defaultValue={lastName}
                          label="pseudonyme"
                          name="lastName"
                          autoComplete="family-name"
                          onChange={(e) => setUserUpdateLastNameValue(e.target.value)}

                        />
                      </Grid>
                    </Box>
                                      {/* <AccountM /> */}
                    <Box sx={{ '& > :not(style)': { m: 1 } , display:'flex', flexDirection:'row', justifyContent:'center'}}>
                      <Fab color="secondary" aria-label="edit">
                            <CheckCircleIcon onClick={() => [setOpenModalCheckCredential(true), setChangeUpdateUser(true)]}>
                              
                            </CheckCircleIcon>
                      </Fab>
                      <Fab className="deleteIconBackground" sx={{backgroundColor:'#FB4747'}}>
                        <DeleteIcon sx={{backgroundColor:'#FB4747'}} onClick={() => [setOpenModalCheckCredential(true), setChangeDeleteUser(true)]}/>
                      </Fab>
                    </Box>
                  </Box>
                </Card>
              </Box>

              <Card variant='outlined' sx={{ border: '1px solid #4462A5', marginBottom: '30px', marginTop: '30px', marginLeft: '20px', width: '40%' }}>
                <Typography sx={{ fontSize: '1.4rem', padding: '15px', fontFamily: 'montserrat', color: 'white', background: '#4462A5' }}>Informations des comptes enfants</Typography>
              </Card>
              {/* KID CARD to edit***** */}
              {KidsValue.map((e) => (
                <Box key={e.id} sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
                  <Card variant='outlined' sx={{ border: '1px solid #4462A5', marginBottom: '30px', marginTop: '30px', marginLeft: '20px', width: '70%' }}>
                  <Box sx={{ display: 'flex', flexDirection: {xs:'column', lg:"row"}, justifyContent: 'flex-start', Width: '100%', padding: '10px', gap: '10px' }}>
                      <Box >

                        <Typography sx={{ fontSize: '1.4rem', padding: '30px', fontFamily: 'montserrat', textTransform: 'uppercase' }}> {e.firstname} </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', Width: '100%', justifyContent: 'space-around', mt: '18px' }}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            autoComplete="given-name"
                            defaultValue={e.firstname}
                            onChange={(e) => setKidUpdateFirstNameValue(e.target.value)}

                            name="firstName"
                            fullWidth
                            label="Nom du compte *"
                            autoFocus
                          />
                        </Grid>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-around', Width: '100%', marginBottom: '20px', mt: '18px' }}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            autoComplete="kid-username"
                            defaultValue={e.username}
                            onChange={(e) => setKidUpdateUsernameValue(e.target.value)}

                            name="kid-username"
                            fullWidth
                            label="Identifiant de connexion-optionnel"
                            autoFocus
                          />
                        </Grid>
                      </Box>


                      <Box sx={{ display: 'flex', justifyContent: 'space-around', Width: '100%', marginBottom: '20px', mt: '18px' }}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            autoComplete="new-password"
                            onChange={(e) => setKidUpdatePasswordValue(e.target.value)}

                            name="password"
                            fullWidth
                            label="Mot de passe-optionnel"
                            autoFocus

                            type="password"

                          />
                        </Grid>
                      </Box>
                    {/* <AccountM /> */}
                    <Box sx={{ '& > :not(style)': { m: 1 } , display:'flex', flexDirection:'row', justifyContent:'center'}}>
                      <Fab color="secondary" aria-label="edit">
                        <CheckCircleIcon onClick={(id)=> handleSubmitUpdate(e.id)}>

                        </CheckCircleIcon>
                      </Fab >
                      <Fab sx={{backgroundColor:'#FB4747'}}>
                      

                        <DeleteIcon sx={{backgroundColor:'#FB4747'}} onClick={(id) => handleOpendeleteKid(e.id)}/>
                        </Fab>
                      
                   
                    </Box>
                    </Box>
                  </Card>
                </Box>
              ))}
              {/* ***** */}


              <Card variant='outlined' sx={{ border: '1px solid #4462A5', marginBottom: '30px', marginTop: '30px', marginLeft: '20px', width: '40%' }}>
                <Typography sx={{ fontSize: '1.4rem', padding: '15px', fontFamily: 'montserrat', color: 'white', background: '#4462A5' }}>Créer un nouveau profil enfant</Typography>
              </Card>
              {/* KID CARD to add ***** */}
              <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
                <Card variant='outlined' sx={{ border: '1px solid #4462A5', marginBottom: '30px', marginTop: '30px', marginLeft: '20px', width: '70%' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', Width: '100%', padding: '10px', gap: '10px' }}>




                    <Box sx={{ display: 'flex', Width: '100%', justifyContent: 'space-around', borderBlockColor: 'red' }}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="given-name"
                          name="firstName"
                          required
                          fullWidth
                          label='Prénom'
                          autoFocus
                          value={kidAddFirstNameValue}
                          onChange={(e) => setKidAddFirstNameValue(e.target.value)}
                        />
                      </Grid>
                    </Box>
                    <Box sx={{ color: 'blue' , textAlign:"justify"}}>
                      Si vous souhaitez donner les accès pour que votre enfant puisse se connecter depuis l'accueil en autonomie, vous pouvez renseigner son identifiant et son mot de passe.
                      Vous serez la seule personne pouvant modifier son identifiant ou son mot de passe. Vous pourrez modifier votre choix après la création de son compte.

                    </Box>

                    <Box sx={{ display: 'flex', Width: '100%', justifyContent: 'space-around' }}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="kid-username"
                          name="kid-username"
                          fullWidth
                          label="Identifiant de connexion"
                          autoFocus
                          value={kidAddUsernameValue}
                          onChange={(e) => setKidAddUsernameValue(e.target.value)}

                        />
                      </Grid>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-around', Width: '100%', marginBottom: '20px' }}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="password"
                          label="Mot de passe"
                          type="password"
                          autoComplete="new-password"
                          value={kidAddPasswordValue}
                          onChange={(e) => setKidAddPasswordValue(e.target.value)}
                        />
                      </Grid>
                    </Box>
                    <p>
                      (*) Les champs marqués d'un astérix sont obligatoires.

                    </p>
                  </Box>
                  <Validate handleSubmit={handleSubmitCreate} />
                </Card>

              </Box>

            </Box>
          

            {/* ** ALERT ERROR *** */}
            <Snackbar
              open={alertUsernameFailed}
              autoHideDuration={6000}
              onClose={() => setAlertUsernameFailed(false)}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                severity="error"
                sx={{
                  width: "100%",
                  display: 'block',
                  textAlign: "center",
                  marginBottom: '60%'
                }}
              >
               Cet identifiant ne peux pas être utilisé. Merci d'en choisir un autre.
              </MuiAlert>
            </Snackbar>

            <Snackbar
              open={alertErrorCreate}
              autoHideDuration={6000}
              onClose={() => setAlertErrorCreate(false)}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                severity="error"
                sx={{
                  width: "100%",
                  display: 'block',
                  textAlign: "center",
                  marginBottom: '60%'
                }}
              >
                Une erreur s'est produite. Merci de réessayer.
              </MuiAlert>
            </Snackbar>
            <Snackbar
              open={alertErrorDelete}
              autoHideDuration={6000}
              onClose={() => setAlertErrorDelete(false)}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                severity="error"
                sx={{
                  width: "100%",
                  display: 'block',
                  textAlign: "center",
                  marginBottom: '60%'
                }}
              >
                Une erreur s'est produite. Merci de réessayer.
              </MuiAlert>
            </Snackbar>
            <Snackbar
              open={alertErrorUpdate}
              autoHideDuration={6000}
              onClose={() => setAlertErrorUpdate(false)}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                severity="error"
                sx={{
                  width: "100%",
                  display: 'block',
                  textAlign: "center",
                  marginBottom: '60%'
                }}
              >
                Une erreur s'est produite. Merci de réessayer.
              </MuiAlert>
            </Snackbar>

            <Snackbar
              open={alertErrorCheckCredential}
              autoHideDuration={7000}
              onClose={() => setAlertErrorCheckCredential(false)}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                severity="error"
                sx={{
                  width: "100%",
                  display: 'block',
                  textAlign: "center",
                  marginBottom: '40%'
                }}
              >
                Ce n'est pas le bon mot de passe. Nous ne pouvons pas accéder à votre demande. 
                En cas d'oubli déconnectez-vous, retournez à l'espace d'accueil de connexion et suivez la procédure d'oubli du mot de passe.
              </MuiAlert>
            </Snackbar>
            <Snackbar
              open={alertErrorUpdate}
              autoHideDuration={6000}
              onClose={() => setAlertErrorUpdate(false)}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                severity="error"
                sx={{
                  width: "100%",
                  display: 'block',
                  textAlign: "center",
                  marginBottom: '60%'
                }}
              >
                Une erreur s'est produite. Merci de réessayer.
              </MuiAlert>
            </Snackbar>

            {/* ** ALERT SUCCESS *** */}

            <Snackbar
              open={alertSuccessUpdate}
              autoHideDuration={6000}
              onClose={() => setAlertSuccessUpdate(false)}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                severity="success"
                sx={{
                  width: "100%",
                  display: 'block',
                  textAlign: "center",
                  marginBottom: '60%'
                }}
              >
                <p>La modification a bien été effectuée.</p>
              </MuiAlert>
            </Snackbar>
            <Snackbar
              open={alertSuccessDelete}
              autoHideDuration={6000}
              onClose={() => setAlertSuccessDelete(false)}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                severity="success"
                sx={{
                  width: "100%",
                  display: 'block',
                  textAlign: "center",
                  marginBottom: '60%'
                }}
              >
                <p>La suppression a bien été effectuée.</p>
              </MuiAlert>
            </Snackbar>

            <Snackbar
              open={alertSuccessCreate}
              autoHideDuration={6000}
              onClose={() => setAlertSuccessCreate(false)}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                severity="success"
                sx={{
                  width: "100%",
                  display: 'block',
                  textAlign: "center",
                  marginBottom: '60%'
                }}
              >
                <p>L'ajout a bien été effectué.</p>
              </MuiAlert>
            </Snackbar>



            {/* ******* MODAL ********** */}
                  {/*  User*/}
                  {/* CheckCredential */}
                <Modal
                          open={openModalCheckCredential}
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

                            <h2 id="parent-modal-title"> {changeDeleteUser ? "Suppression du compte?" : "Modification du compte?"}</h2>
                            <p className="parent-modal-description">
                             Merci de Confirmer votre mot de passe
                            </p>
                            <Box component="form" noValidate 
                              sx={{
                                margin: 10,
                                textAlign:'center'
                              }}
                            >
                              <Button
                                className="closeButton"
                                fullWidth
                                variant="contained"
                                onClick={handleClose} 
                                sx={{ mt: 2, mb: 2, background: 'red' }}
                              >
                                Non, c'est une erreur. Annuler
                              </Button>
                              <TextField
                              type={passwordVisibility ? "password" : ""}

                          value={passwordToCheck}
                          
                          placeholder="Confirmation mot de passe"
                          onChange={(e) => setPasswordToCheck(e.target.value)}
                        >
                        </TextField>
                        <img sx={{margin:'auto'}}edge="end" alt={rightIcon === "eye" ? "Set password visible" : "set password invisible"} src={rightIcon === "eye" ? OpenEye : CloseEye} size={22} onClick={handlePasswordVisibility} />

                        <Button
                          className="confirmPasswordButton"
                          fullWidth
                          variant="contained"
                          label='confirmation mot de passe'
                          onClick={handleSubmitCheckCredential}
                          sx={{ mt: 2, mb: 2, background: '#4462A5' }}
                        >
                          Vérifier le mot de passe
                        </Button>
                            </Box>
                          </Box>
                        </Modal> 
                        {/* Confirm Delete */}

                          <Modal
                          open={openModalConfirmDeleteUser}
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

                            <h2 id="parent-modal-title"> Suppression du compte?</h2>
                            <p className="parent-modal-description">
                              Mot de passe confirmé.
                            </p>
                            <p className="parent-modal-description">

                            Etes-vous certain de vouloir supprimer ce compte? Cette action sera définitive et entrainera la suppression des comptes enfants associés.
                            </p>
                            <Box component="form" noValidate 
                              sx={{
                                margin: 10
                              }}
                            >
                              <Button
                                className="closeButton"
                                fullWidth
                                variant="contained"
                                onClick={handleClose} 
                                sx={{ mt: 2, mb: 2, background: 'red' }}
                              >
                                Non, c'est une erreur. Annuler.
                              </Button>
                              <Button
                                className="deleteButton"
                                fullWidth
                                variant="contained"
                                onClick={handleSubmitDeleteUser}
                                sx={{ mt: 2, mb: 2, background: 'green' }}
                              >
                                Oui, je suis sûr. Supprimer.
                              </Button>
                            </Box>
                          </Box>
                        </Modal> 
                      {/* Good Bye message when user delete account */}

                      <Modal
                          open={openModalDeleteAccountMessage}
                          onClose={handleClose}
                          aria-labelledby="parent-modal-title"
                          aria-describedby="parent-modal-description"
                          disableEnforceFocus
                        >
                          <Box sx={{
                            width: '40%',
                            padding:10,
                            backgroundColor: 'white',
                            margin: 'auto',
                            alignContent: 'center',
                            textAlign:'center'
                          }}
                          >

                            <h2 id="parent-modal-title"> Merci d'avoir fait un bout de chemin avec nous!</h2>
                            <p className="parent-modal-delete-account" >
                            Nous avons été heureux de vous compter parmis nos membres.
                            </p>
                            <p className="parent-modal-delete-account" >
                            Nous vous souhaitons une belle journée. 
                            </p>
                            <p className="parent-modal-delete-account" >

                            Bonne continuation. 
                             </p>

                            <img className="logoModal" src={logoBook} alt="logo Book" width={'30%'} >
 
                            
                            </img>
                          <Link to={'/'} style={{"textDecoration":"none"}}>
                          
                              <Button
                                className="closeButton"
                                fullWidth
                                variant="contained"
                                onClick={handleClose} 
                                sx={{ mt: 2, mb: 2, background: 'blue' }}
                              >
                              Retour à l'Accueil
                              </Button>
                          </Link>
                              
                            </Box>
                        </Modal> 



                        {/*----- Kid ------- */}
                        <Modal
                          open={openModalDeleteKid}
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

                            <h2 id="parent-modal-title"> Suppression du compte?</h2>
                            <p className="parent-modal-description">
                              Etes-vous sur de vouloir supprimer ce compte ? Cette action sera définitive et irréversible.
                            </p>
                            <Box component="form" noValidate 
                              sx={{
                                margin: 10
                              }}
                            >
                              <Button
                                className="closeButton"
                                fullWidth
                                variant="contained"
                                onClick={handleClose} 
                                sx={{ mt: 2, mb: 2, background: 'red' }}
                              >
                                Non, c'est une erreur. Annuler.
                              </Button>
                              <Button
                                className="deleteButton"
                                fullWidth
                                variant="contained"
                                onClick={handleSubmitDelete}
                                sx={{ mt: 2, mb: 2, background: 'green' }}
                              >
                                Oui, je suis sûr. Supprimer.
                              </Button>
                            </Box>
                          </Box>
                        </Modal> 

          </Box>

        </Box>

        
      </div>
    </ThemeProvider>
  )
}

export default AccountManagement