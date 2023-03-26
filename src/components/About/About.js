import React from 'react';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import { Typography } from '@mui/material'


import './About.scss';

function About() {
  return (
    <div className='About' >
  <Box className="wrapperAbout" sx={{margin: '30px'}} >

    <Typography className='titre1' variant="h1" sx={{color:"#4462A5", padding: '40px', letterSpacing:'1px', }}>  Qui sommes-nous </Typography>

    <Typography className='titre2' variant="h2" sx={{paddingBottom:'10px', lineHeight: '40px', letterSpacing:'2px', alignItems:'center'}}>
          Bienvenue sur Livres O'Trésor développé par une équipe de développeurs talentueux. 
    </Typography>
    <Box className='box1' sx={{display: {xs:'flex-column', alignSelf: 'center', md: 'flex', justifyContent: 'center',  marginBottom: '35px', gap:'100px'} }}>


           <Typography className='paragraphe-1' sx={{ maxWidth: '900px', lineHeight: '30px', letterSpacing:'2px'}}>

              Notre site sert à encourager les enfants qui aiment la lecture en fournissant une plate-forme sûre tout en étant supervisés par un parent. Notre équipe a pour but de créer un site de qualité, pour que les parents passent du temps avec leurs enfants, et puissent partager leur amour de la lecture avec eux.
            </Typography> </Box>
  
              <Typography className='titre1' variant="h1" sx={{color:"#4462A5", padding: '40px', letterSpacing:'1px'}}>L'équipe </Typography>
                
              <Box className='box1'  sx={{display: {xs:'flex-column', md: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: '40px', gap:'100px'} }}>

              <Typography className='paragraphe' sx={{ padding:'30px', maxWidth: {md:'400px'}, minHeight: '200px', lineHeight: '2', letterSpacing:'2px', border:'3px solid #4462A5'}}>

              <CardMedia
              component="img"
              sx={{width:'30%', margin: 'auto'}}
              image="img/Avatar-MarieLou.png"
              ></CardMedia>
               Marie Lou Prince-Levasseur  <br/>
               Product Owner<br/>
               Développeuse Symfony (et Réact)
              </Typography>
              <Typography className='paragraphe' sx={{ padding:'30px', maxWidth: {md:'400px'}, minHeight: '200px', lineHeight: '2', letterSpacing:'2px', border:'3px solid #4462A5'}}>
              <CardMedia
              component="img"
              sx={{width:'30%', margin: 'auto'}}
              image="img/Avatar-Cedric.png"
              ></CardMedia>
              Cédric Cochard <br/>
              Scrum Master<br/>
              Développeur Réact
              </Typography>
              <Typography className='paragraphe' sx={{ padding:'30px',  maxWidth: {md:'400px'}, minHeight: '200px', lineHeight: '2', letterSpacing:'2px', border:'3px solid #4462A5'}}>
              <CardMedia
              component="img"
              sx={{width:'30%', margin: 'auto'}}
              image="img/Avatar-Tiphany.png"
              ></CardMedia>
              Tiphany Quemeneur <br/>
              Git Master<br/>
              Développeuse Symfony
              </Typography></Box>
              <Box className='box2' sx={{display: {xs:'flex-column', md: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: '35px', gap:'100px',} }}>
              <Typography className='paragraphe' sx={{ padding:'30px', maxWidth: {md:'400px'}, minHeight: '200px', lineHeight: '2', letterSpacing:'2px', border:'3px solid #4462A5'}}>
              <CardMedia
              component="img"
              sx={{width:'30%', margin: 'auto'}}
              image="img/Avatar-Maxime.png"
              ></CardMedia>
              Maxime Kerkheide<br/>
              Lead Front<br/>
              Développeur Réact
              </Typography>
              <Typography className='paragraphe' sx={{ padding:'30px', maxWidth: {md:'400px'}, minHeight: '200px', lineHeight: '2', letterSpacing:'2px', border:'3px solid #4462A5'}}>
              <CardMedia
              component="img"
              sx={{width:'30%', margin: 'auto'}}
              image="img/Avatar-Aswan.png"
              ></CardMedia>
              Aswan Joseph-Mathieu<br/>
              Lead Back<br/>
              Développeuse Symfony (et graphiste)
              </Typography>

      </Box>
      </Box>

    </div>
    )


}

export default About