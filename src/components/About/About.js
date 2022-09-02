import React from 'react';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import { Typography } from '@mui/material'


import './About.scss';

function About() {
  return (
    <div className='About'>
    <Typography className='titre1' variant="h1" sx={{color:"#4462A5", padding: '40px', letterSpacing:'1px', }}>  Qui sommes-nous </Typography>

    <Typography className='titre2' variant="h2" sx={{paddingBottom:'10px', lineHeight: '40px', letterSpacing:'2px', width:{xs:'70%', md:'100%'}}}>
          Bienvenue sur Livres O'Trésor développé par une équipe de développeurs talentueux. </Typography>
          <Box className='box1' sx={{display: {xs:'flex-column', md: 'flex', justifyContent: 'center',  marginBottom: '35px', gap:'100px'} }}>


           <Typography className='paragraphe-1' sx={{ maxWidth: '900px', lineHeight: '30px', letterSpacing:'2px'}}>

Notre site sert à encourager et de fournir une plate-forme sûre pour les enfants qui aiment la lecture tout en étant supervisés par un parent. Notre équipe a pour but de créer un site de qualité, pour que les parents passent du temps avec leurs enfants, et puisse partager leur amour à la lecture avec eux.
            </Typography> </Box>
  
              <Typography className='titre1' variant="h1" sx={{color:"#4462A5", padding: '40px', letterSpacing:'1px'}}>L'équipe </Typography>
                
              <Box className='box1'  sx={{display: {xs:'flex-column', md: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: '40px', gap:'100px'} }}>

              <Typography className='paragraphe' sx={{ padding:'30px', maxWidth: '400px', minHeight: '200px', lineHeight: '150px', letterSpacing:'2px', border:'3px solid #4462A5'}}>
              <CardMedia
              component="img"
              sx={{width:'30%', margin: 'auto'}}
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/512px-Circle-icons-profile.svg.png"
              ></CardMedia>
               Owner: Marie Lou Prince-Levasseur   
              </Typography>
              <Typography className='paragraphe' sx={{ padding:'30px', maxWidth: '400px', minHeight: '200px', lineHeight: '150px', letterSpacing:'2px', border:'3px solid #4462A5'}}>
              <CardMedia
              component="img"
              sx={{width:'30%', margin: 'auto'}}
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/512px-Circle-icons-profile.svg.png"
              ></CardMedia>
              Scrum Master: Cédric Cochard
              </Typography>
              <Typography className='paragraphe' sx={{ padding:'30px', maxWidth: '400px', minHeight: '200px', lineHeight: '150px', letterSpacing:'2px', border:'3px solid #4462A5'}}>
              <CardMedia
              component="img"
              sx={{width:'30%', margin: 'auto'}}
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/512px-Circle-icons-profile.svg.png"
              ></CardMedia>
              Git Master: Tiphany Quemeneur
              </Typography></Box>
              <Box className='box2' sx={{display: {xs:'flex-column', md: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: '35px', gap:'100px',} }}>
              <Typography className='paragraphe' sx={{ padding:'30px', maxWidth: '400px', minHeight: '200px', lineHeight: '150px', letterSpacing:'2px', border:'3px solid #4462A5'}}>
              <CardMedia
              component="img"
              sx={{width:'30%', margin: 'auto'}}
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/512px-Circle-icons-profile.svg.png"
              ></CardMedia>
              Lead Front: Maxime Kerkheide
              </Typography>
              <Typography className='paragraphe' sx={{ padding:'30px', maxWidth: '400px', minHeight: '200px', lineHeight: '150px', letterSpacing:'2px', border:'3px solid #4462A5'}}>
              <CardMedia
              component="img"
              sx={{width:'30%', margin: 'auto'}}
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/512px-Circle-icons-profile.svg.png"
              ></CardMedia>
              Lead Back: Aswan Joseph-Mathieu
              </Typography>

      </Box>

    </div>
    )


}

export default About