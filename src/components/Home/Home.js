import React from 'react'
import Box from '@mui/material/Box';
import Faq from './Faq/Faq'
import HomeCarousel from './HomeCarousel/HomeCarousel'
import { Typography } from '@mui/material'

import './Home.scss'
import Image1 from '../../assets/img/kidlogin.jpg'


function Home() {
  return (
    <div className='home'sx={{width: '70%' , display: {xs:'flex-column', md: 'flex'} }}>
      <HomeCarousel />
      <Typography className='titre1' variant="h1" sx={{color:"#4462A5", padding: '40px', letterSpacing:'1px'}}>Bienvenue sur le site de O'Trésor</Typography>
      <Typography className='titre2' variant="h2" sx={{paddingBottom:'40px', lineHeight: '40px', letterSpacing:'2px'}}>
        Vous trouverez ici un espace de tranquillité personnel pour ranger les livres de votre enfant en toute simplicité.
      </Typography>
      <Box className='box1' sx={{display: {xs:'flex-column', md: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '35px'} }}>
      <Box 
      component="img"
      alt="à définir"
      src={Image1}
      sx={{
        height: 300,
        width: 300,
        maxHeight: { xs: 300, md: 450 },
        maxWidth: { xs: 300, md: 450 },
      }}
      />
      <Typography className='paragraphe' sx={{ padding:'44px', maxWidth: '300px', lineHeight: '40px', letterSpacing:'2px'}}>
      Aider les jeunes enfants dans l’accompagnement à la lecture par la motivation.
      Permettre aux plus grands d’y stocker facilement et d’y répertorier leurs listes d’envie à venir comme leurs livres lus.
      </Typography>
      </Box>
      <Box className='box1' sx={{display: {xs:'flex-column', md: 'flex', justifyContent: 'center', alignItems: 'center'} }}>
      <Typography className='paragraphe' sx={{ padding:'44px', maxWidth: '300px', lineHeight: '40px', letterSpacing:'2px'}}>
      Plus de doublons dans leur collection, vous pourrez désormais plus facilement vous y retrouver vous aussi.
      La gestion de la bibliothèque a volontairement été simplifiée pour une utilisation plus fluide pour les jeunes enfants. Il ne reste plus qu’à prendre possession de votre nouvel espace.
      </Typography>
      <Box 
      component="img"
      alt="à définir"
      src={Image1}
      sx={{
        height: 300,
        width: 300,
        maxHeight: { xs: 300, md: 450 },
        maxWidth: { xs: 300, md: 450 },
      }}
      />
      </Box>
      <Typography  sx={{margin:'20px', color: '#4462A5', fontSize: '1.4rem'}}>
       BONNE LECTURE !
      </Typography>

      <Faq />
    </div>
  )
}

export default Home