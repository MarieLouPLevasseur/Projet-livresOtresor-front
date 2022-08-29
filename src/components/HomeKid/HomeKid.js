import React from 'react'
import { Box, Rating, Typography, Avatar } from '@mui/material'

import HomeCarousel from '../Home/HomeCarousel/HomeCarousel'
import HomeKidButtons from './HomeKidButtons/HomeKidButtons'
import HomeKidProgressBar from './HomeKidProgressBar/HomeKidProgressBar'

import Cover from '../../assets/img/defaultCover.jpg'

import './HomeKid.scss'

function HomeKid() {
  return (
    <div className='homeKid'>
      <HomeCarousel />
      <Box sx={{display: 'flex'}}>
        <HomeKidButtons />
        <Box sx={{display: 'flex', width: '70%', flexDirection: 'column', alignItems: 'center', mt: 2}}>
        <Avatar
        alt="avatar enfant"
        src="https://zupimages.net/up/22/34/mcth.png"
        sx={{ width: 150, height: 150 }}
        />
          <Typography sx={{ mt: 3, mb: 1, fontFamily: 'Montserrat', fontWeight: 600 }}>
            Niveau 1
          </Typography>
          <HomeKidProgressBar bgcolor= '#4462A5' completed='50'/>
          <Typography sx={{ mt: 3, fontFamily: 'Montserrat', fontWeight: 500 }}>
            Plus que 3 livres avant le niveau suivant !
          </Typography>
        </Box>
      </Box>
      <Box sx={{display: 'flex', width: '70%', m:'auto' }}>
        <Box 
          component="img"
          alt="Couverture d'un livre"
          src={Cover}
          sx={{
            height: 300,
            width: 300,
            maxHeight: { xs: 200, md: 300 },
            maxWidth: { xs: 200, md: 300 },
            marginLeft: 20,
            marginBottom: 15,
            marginTop: 8
          }}
        />
        <Box sx={{width: '50%', textAlign: 'center'}}>
          <Typography sx={{ mt: 8, fontFamily: 'Montserrat', fontWeight: 500 }}>
            Livre le plus récent ajouté
          </Typography>
          <Typography sx={{ mt: 3,mb: 3, fontFamily: 'Montserrat', fontWeight: 500 }}>
            le 29/08/2022
          </Typography>
          <Rating name="read-only" value='4' readOnly />
          <Typography sx={{ m: 'auto', mt: 3, fontFamily: 'Montserrat', fontWeight: 300, width: '80%', fontStyle: 'italic' }}>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque congue sem ante, vitae vestibulum nisi consectetur eget. Maecenas luctus fermentum commodo. Maecenas id mauris maximus, dapibus ante eu, elementum nulla. Sed elit velit, venenatis quis est ac, porttitor dignissim magna. Integer non lectus sit amet ante elementum fringilla. Ut in varius leo."
          </Typography>
        </Box>
      </Box>
    </div>
  )
}

export default HomeKid