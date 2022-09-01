import React from 'react'
import { Box, Rating, Typography, Avatar } from '@mui/material'
import HomeCarousel from '../Home/HomeCarousel/HomeCarousel'

import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

import './Tutorial.scss';

function Tutorial() {
  return (
    <div>
      
    <Box sx={{m:10}}>
      <HomeCarousel />
      <Typography sx={{ mt: 3, mb: 3, fontFamily: 'Montserrat', fontWeight: 700, fontSize: 40, letterSpacing: 2, color: '#4462A5' }}>
          Tutoriel
      </Typography>

    {/* Image à droite */}
      <Card sx={{ display: 'flex', flexDirection: {xs:'column', md:'row'},justifyContent:'space-between', ml: 20, mr:20, mb:10, height:300}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', textAlign:'center', width:'50%'}}>
          <CardContent sx={{ flex: '1 0 auto', AlignItem:'center' }}>
            <Typography component="div" variant="h5" textAlign='center'>
              blablabla mon titre de carte
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              Blablabla mon texte de carte
            </Typography>
          </CardContent>
        
      </Box>
        <Box sx={{ width:'50%'}}>
          <CardMedia
            component="img"
            sx={{ height: '100%'}}
            image="https://cdn.pixabay.com/photo/2018/07/28/20/12/kid-reading-3568850__340.jpg"
            alt="tutoriel"/>
        </Box>
      </Card>
  
    {/* Image à Gauche */}

      <Card sx={{ display: 'flex', flexDirection: {xs:'column', md:'row-reverse'},justifyContent:'space-between', ml: 20, mr:20, height:300}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', textAlign:'center', width:'50%'}}>
          <CardContent sx={{ flex: '1 0 auto', AlignItem:'center' }}>
            <Typography component="div" variant="h5" textAlign='center'>
              blablabla mon titre de carte
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              Blablabla mon texte de carte
            </Typography>
          </CardContent>
        
      </Box>
        <Box sx={{ width:'50%'}}>
          <CardMedia
            component="img"
            sx={{ height: '100%'}}
            image="https://cdn.pixabay.com/photo/2018/07/28/20/12/kid-reading-3568850__340.jpg"
            alt="tutoriel"/>
        </Box>
      </Card>

    
   </Box>
  </div>
   
  )
}

export default Tutorial