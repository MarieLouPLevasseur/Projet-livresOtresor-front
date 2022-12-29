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

    const [openModalWarningLogout, setOpenModalWarningLogout] = useState(true);
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
  console.log((isLogUser || isLogKid), "test condition log user or kid")
    useEffect(() => {
      if(isLogUser || isLogKid){
      setTimeout(() => handleOpenModalWarningLogout(),1000*10);
      setTimeout(() => handleCloseWarningLogout(),1000*3600);
      setTimeout(() => navigate('/connexion-parent'),1000*3600);
      setTimeout(() => handleLogout(),1000*3600);
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