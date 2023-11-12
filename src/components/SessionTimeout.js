import React, {
    useState,
    useEffect,    
    
  } from 'react';

  import {useNavigate, Link } from 'react-router-dom';
  import { Box } from '@mui/material';
  import Button from '@mui/material/Button';

  import Modal from '@mui/material/Modal';
  import { useDispatch, useSelector } from 'react-redux';

  import { userLogout } from '../features/login/userSlice';
  import { kidLogout } from '../features/login/kidSlice';


  const SessionTimeout = () => {

    const isLogUser = useSelector((state) => state.user.isLogUser);
    const isLogKid = useSelector((state) => state.kid.isLogKid);

    const [openModalWarningLogout, setOpenModalWarningLogout] = useState(false);
    const handleOpenModalWarningLogout = () => {
      setOpenModalWarningLogout(true)
    }
    const handleCloseWarningLogout = () => {
      setOpenModalWarningLogout(false);

    }
    // navigation
    const navigate = useNavigate();
  
    const dispatch = useDispatch();


    const handleLogout = () => {
        dispatch(userLogout());
        dispatch(kidLogout())
        localStorage.removeItem('user');
        localStorage.removeItem('kid');
      };
  // console.log((isLogUser || isLogKid), "test condition log user or kid")
    useEffect(() => {
      if(isLogUser || isLogKid){
        setTimeout(() => handleOpenModalWarningLogout(), 1000 * 60 * 55); // Avertissement après 55 minutes
        setTimeout(() => handleCloseWarningLogout(), 1000 * 60 * 60);  // Fermer l'avertissement après 5 minutes
        setTimeout(() => navigate('/'), 1000 * 60 * 60);  // Rediriger après 1 heure (temps total de connexion maximal back)
        setTimeout(() => handleLogout(), 1000 * 60 * 60);  // Déconnecter après 1 heure (temps total de connexion maximal back)

        // TEST
        // setTimeout(() => handleOpenModalWarningLogout(), 1000 * 30); // Déconnexion après 30 secondes pour les tests
        // setTimeout(() => handleCloseWarningLogout(), 1000 * 60);     // Fermeture de l'avertissement après 60 secondes
        // setTimeout(() => navigate('/'), 1000 * 60);                  // Redirection après 60 secondes
        // setTimeout(() => handleLogout(), 1000 * 60);                 // Déconnexion après 60 secondes
      }
    
    }, [isLogUser, isLogKid]);
    
    if (!openModalWarningLogout) {
      return null;
    }
  
    return <Modal
    open={openModalWarningLogout}
    onClose={handleCloseWarningLogout}
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

      <h2 className="parent-modal-title"> Déconnexion</h2>
      <p className="parent-modal-description">
          Vous êtes connecté depuis plus d'une heure. 
          Par mesure de sécurité vous serez déconnecté automatiquement dans 5 minutes
           et amener à remettre votre mot de passe pour poursuivre sur le site.</p>
      <Box component="form" noValidate 
        sx={{
          margin: 10
        }}
      >
        <Button
          className="closeButton"
          fullWidth
          variant="contained"
          onClick={handleCloseWarningLogout} 
          sx={{ mt: 2, mb: 2, background: 'blue' }}
        >
         Ok, j'ai compris.
        </Button>
        
        <Link 
        style={{"textDecoration":"none"}}
        to= {`/connexion-${isLogUser? 'parent' : 'enfant'}`} >

        <Button
          className="redirectionButton"
          fullWidth
          variant="contained"
          onClick={event => {
            setOpenModalWarningLogout(false);
            handleLogout();
          }}
          sx={{ mt: 2, mb: 2, background: 'red' }}
        >
         Me reconnecter dès maintenant.
        </Button>
        </Link>
      </Box>
    </Box>
  </Modal> ;
  };
  
  export default SessionTimeout;