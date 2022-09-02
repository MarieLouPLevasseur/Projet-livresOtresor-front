import React from 'react'
import ButtonList from '../HomeUser/ButtonList/ButtonList'
import HomeCarousel from '../Home/HomeCarousel/HomeCarousel'
import Card from '@mui/material/Card';

import './HomeUser.scss'
import { Button, Typography } from '@mui/material';
import Account from './Account/Account';


function HomeUser() {
  return (
    <div>
      <HomeCarousel />
      <Card variant='outlined' sx={{border:'1px solid #4462A5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width:'70%', margin: 'auto', marginBottom:'30px', marginTop:'30px'}}>
        <Typography sx={{fontSize: '1.4rem', padding:'30px', fontFamily: 'montserrat'}}>Gestion compte personnel</Typography>
        <Account />
      </Card>
      <Button className='button'sx={{marginBottom: '30px'}}>
        <Typography sx={{fontSize: '1.4rem', padding:'20px', background:'#4462A5', color:'white', letterSpacing:'1px', fontFamily: 'montserrat'}}>Ajouter un compte</Typography>
      </Button>
      <Card className='card' variant='outlined' sx={{border:'1px solid #4462A5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width:'70%', margin: 'auto', marginBottom:'30px', background: '#'}}>
        <Typography sx={{fontSize: '1.4rem', padding:'30px', fontFamily: 'montserrat'}}>Nom compte enfant</Typography>
        <ButtonList />
      </Card>
      <Card className='card' variant='outlined' sx={{border:'1px solid #4462A5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width:'70%', margin: 'auto', marginBottom:'30px'}}>
        <Typography sx={{fontSize: '1.4rem', padding:'30px', fontFamily: 'montserrat'}}>Nom compte enfant</Typography>
        <ButtonList />
      </Card>
      <Card className='card' variant='outlined' sx={{border:'1px solid #4462A5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width:'70%', margin: 'auto', marginBottom:'30px'}}>
        <Typography sx={{fontSize: '1.4rem', padding:'30px', fontFamily: 'montserrat'}}>Nom compte enfant</Typography>
        <ButtonList />
      </Card>
    </div>
  )
}

export default HomeUser