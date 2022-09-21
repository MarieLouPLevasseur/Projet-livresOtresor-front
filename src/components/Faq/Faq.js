import React from 'react'
import { Typography, Box, Button } from '@mui/material'
import Accordion1 from './Accordion1/Faq'
import Accordion2 from './Accordion2/Faq'
import Accordion3 from './Accordion3/Faq'
import Accordion4 from './Accordion4/Faq'

import './Faq.scss'

function Faq() {
  return (
    <div className='faq'>

      <Box sx={{m:10}}>
      <Typography sx={{mb: 3, fontFamily: 'Montserrat', fontWeight: 700, fontSize: 40, letterSpacing: 2, color: '#4462A5' }}>
          La cocotte à questions !
      </Typography>
      <img src="https://us.123rf.com/450wm/kongvector/kongvector1809/kongvector180904728/109980012-avec-autocuiseur-%C3%A9lectrique-drapeau-isol%C3%A9-sur-illustration-vectorielle-mascotte.jpg?ver=6" alt="page erreur" width="200" height='auto'></img>
      </Box>

      {/* <Box sx={{display:'flex', justifyContent: 'center'}}>
        <Button
          className='button'
          sx={{ my: 2, color: 'red',fontFamily:'Montserrat', display: 'block', ml: 5}}>
          Mon profil enfant
        </Button>
        <Button
          className='button'
          sx={{ my: 2, color: 'red',fontFamily:'Montserrat', display: 'block', ml: 5}}>
          Mes livres
        </Button>
        <Button
          className='button'
          sx={{ my: 2, color: 'red',fontFamily:'Montserrat', display: 'block', ml: 5}}>
          Mes récompenses
        </Button>
        <Button
          className='button'
          sx={{ my: 2, color: 'red',fontFamily:'Montserrat', display: 'block', ml: 5}}>
          Mon compte parent
        </Button>
      </Box> */}

      <Box className='boxaccor2' sx = {{display: {xs: 'flex'}, mt:'100px'}}>
        <Box className='boxaccor' sx={{width:900}}>
          <Typography  sx={{color: '#4462A5', fontSize: '1.4rem', fontFamily: 'Montserrat'}}>
          Mon profil parent
          </Typography>
          <Accordion4 />
        </Box>
        <Box sx={{width:900}}>
          <Typography  sx={{color: '#4462A5', fontSize: '1.4rem', fontFamily: 'Montserrat'}}>
          Mon profil enfant
          </Typography>
          <Accordion1 />
        </Box>
      </Box>
      <Box className='boxaccor' sx = {{display: {xs: 'flex'}, mt:'100px'}}>
        <Box sx={{width:900}}>
          <Typography  sx={{color: '#4462A5', fontSize: '1.4rem', fontFamily: 'Montserrat'}}>
          Mes livres 
          </Typography>
          <Accordion2 />
        </Box>
        <Box sx={{width:900}}>
          <Typography  sx={{color: '#4462A5', fontSize: '1.4rem', fontFamily: 'Montserrat'}}>
          Mes récompenses
          </Typography>
          <Accordion3 />
        </Box>
      </Box>
    </div>
  )
}

export default Faq