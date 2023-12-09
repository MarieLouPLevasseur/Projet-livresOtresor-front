import React, { useState,useEffect } from 'react'
import Box from '@mui/material/Box';
import Faq from './Faq/Faq'
import HomeCarousel from './HomeCarousel/HomeCarousel'
import { Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';

import './Home.scss'
import Image1 from '../../assets/img/homeimage1.jpg'
import Image2 from '../../assets/img/homeimage2.jpg'
import Logo from '../../assets/img/logo.3.png'
import CustomModal from './../CustomModal';

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

// function Home() {
function Home ( ) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const isLogUser = useSelector((state) => state.user.isLogUser);
  const isLogKid = useSelector((state) => state.kid.isLogKid);

  useEffect(() => {
    // Récupérer des données du localStorage
    const isAutoLogoutString = localStorage.getItem('isAutoLogout');
    const isAutoLogout = JSON.parse(isAutoLogoutString);
    
    if (isAutoLogout) {
      setShowLogoutModal(true);
      localStorage.setItem('isAutoLogout', JSON.stringify(false));
    }
  }, []);
  

  return (
    <ThemeProvider theme={theme}>
    {/* Modal de déconnexion */}
    <CustomModal
      open={showLogoutModal}
      onClose={() => setShowLogoutModal(false)}
      title="Déconnexion"
      description="Vous avez été déconnecté"
    />
     
    <div className='home'>
      <HomeCarousel />
      <Box sx={{display: 'flex', flexDirection: 'column', width: '70%', m: 'auto'}}>
      <Typography sx={{ mt: 5, mb: 5, fontFamily: 'Montserrat', fontWeight: 700, fontSize: 40, letterSpacing: 3, color: '#4462A5' }}>
        Bienvenue sur le site de
      </Typography>
      <Box 
        component="img"
        alt="à définir"
        src={Logo}
        sx={{
          m: 'auto',
          mb: 8,
          height: 350,
          width: 350,
          maxHeight: { xs: 300, md: 350 },
          maxWidth: { xs: 300, md: 350 },
        }}
        />
      <Typography className='titre2' variant="h1" sx={{paddingBottom:'40px', lineHeight: '40px', letterSpacing:'2px', width:{xs:'70%', md:'100%'}}}>
        Vous trouverez ici un espace de tranquillité personnel pour ranger les livres de votre enfant en toute simplicité.
      </Typography>
      <Typography sx={{ mt: 3, mb: 3, fontFamily: 'Montserrat', textDecoration: 'underline', fontWeight: 500, fontSize: 30, letterSpacing: 2, color: '#4462A5' }}>
            Notre projet ?
      </Typography>
      <Box className='box1' sx={{display: {xs:'flex-column', md: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '35px' } }}>
        <Box 
        component="img"
        alt="à définir"
        src={Image1}
        sx={{
          height: 400,
          width: 400,
          maxHeight: { xs: 300, md: 400 },
          maxWidth: { xs: 300, md: 400 },
        }}
        />
      <Typography className='paragraphe' sx={{maxWidth:{xs:'100%', md:'50%'} ,lineHeight: '30px', fontWeight: 300,fontSize: 22, letterSpacing:'2px', margin:'auto'}}>
        Aider les jeunes enfants dans l’accompagnement à la lecture par la motivation.
        Permettre aux plus grands d’y stocker facilement et d’y répertorier leurs listes d’envie à venir comme leurs livres lus.
      </Typography>
      </Box>
      <Typography sx={{ mt: 3, mb: 3, fontFamily: 'Montserrat', textDecoration: 'underline', fontWeight: 500, fontSize: 30, letterSpacing: 2, color: '#4462A5' }}>
        Mais encore ?
      </Typography>
      <Box className='box1' sx={{display: {xs:'flex-column', md: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '35px'}  }}>
        <Typography className='paragraphe' sx={{maxWidth:{xs:'100%', md:'50%'} ,lineHeight: '30px', fontWeight: 300,fontSize: 22, letterSpacing:'2px', margin:'auto'}}>
          Plus de doublons dans leur collection, vous pourrez désormais plus facilement vous y retrouver vous aussi.
          La gestion de la bibliothèque a volontairement été simplifiée pour une utilisation plus fluide pour les jeunes enfants. Il ne reste plus qu’à prendre possession de votre nouvel espace.
        </Typography>
        <Box 
        component="img"
        alt="à définir"
        src={Image2}
        sx={{
          height: 400,
          width: 400,
          maxHeight: { xs: 300, md: 400 },
          maxWidth: { xs: 300, md: 400 },
        }}
        />
      </Box>
      <Typography sx={{ mt: 3, mb: 3, fontFamily: 'Montserrat', textDecoration: 'underline', fontWeight: 500, fontSize: 30, letterSpacing: 2, color: '#4462A5' }}>
        Bonne Lecture !
      </Typography>
    </Box>
    <Faq />
    </div>
    </ThemeProvider>
  )
}

export default Home