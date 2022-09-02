import React from 'react'
import { Box, Typography, Avatar } from '@mui/material'

import HomeCarousel from '../Home/HomeCarousel/HomeCarousel'
import HomeKidButtons from '../HomeKid/HomeKidButtons/HomeKidButtons'
import HomeKidProgressBar from '../HomeKid/HomeKidProgressBar/HomeKidProgressBar'
import DiplomaList from './RewardsList/DiplomaList'

import './Rewards.scss'
import AvatarList from './RewardsList/AvatarList'

function Rewards() {
  return (
    <div className='homeKid'>
      <HomeCarousel />
      <Typography sx={{ mt: 3, mb: 3, fontFamily: 'Montserrat', fontWeight: 700, fontSize: 40, letterSpacing: 2, color: '#4462A5' }}>
            Mes récompenses
      </Typography>
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
      <Typography sx={{ mt: 5, mb: 3, fontFamily: 'Montserrat', textDecoration: 'underline', fontWeight: 500, fontSize: 30, letterSpacing: 2, color: '#4462A5' }}>
            Mes avatars
      </Typography>
      <Box sx={{ display: 'flex', width: '70%', m: 'auto' }} >
          <AvatarList />
      </Box>
      <Typography sx={{ mt: 3, mb: 3, fontFamily: 'Montserrat', textDecoration: 'underline', fontWeight: 500, fontSize: 30, letterSpacing: 2, color: '#4462A5' }}>
            Mes certificats
      </Typography>
      <Box sx={{ display: 'flex', width: '70%', m: 'auto', mb: 5 }} >
          <DiplomaList />
      </Box>
    </div>
  )
}

export default Rewards