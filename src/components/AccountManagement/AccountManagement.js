import React from 'react'
// import Card from '@mui/material/Card';

import { Box, Typography, TextField, Card, Button } from '@mui/material';
import AccountM from './AccountM/AccountM';

import './AccountManagement.scss';

function AccountManagement() {
  return (
    <div>
        <Card variant='outlined' sx={{border:'1px solid #4462A5', display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth:'300px', margin: 'auto', marginBottom:'30px', marginTop:'30px'}}>
          <Typography sx={{fontSize: '1.4rem', padding:'30px', fontFamily: 'montserrat'}}>Réglages</Typography>
        </Card>
        <Box sx={{display:'flex', alignItems:'start', flexDirection:'column' , Width:'100%' }}>
          <Card variant='outlined' sx={{border:'1px solid #4462A5', marginBottom:'30px', marginTop:'30px', marginLeft:'20px', width:'300px'}}>
            <Typography sx={{fontSize: '1.4rem', padding:'15px', fontFamily: 'montserrat', margin:'auto'}}>Informations</Typography>
          </Card>
          <Box sx={{display:'flex', justifyContent:'space-around', alignItems:'center', width: '70%'}}>
            <Card variant='outlined' sx={{border:'1px solid #4462A5', marginBottom:'30px', marginTop:'30px', marginLeft:'20px', width:'70%'}}>
              <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start', Width:'100%', padding:'10px' }}>
                <Box sx={{display:'flex', Width:'100%', justifyContent:'space-around' }}>
                    {/* <Typography sx={{fontSize: '1.4rem', padding:'15px', fontFamily: 'montserrat', margin:'auto'}}>Email :</Typography> */}
                    {/* <AccountM /> */}
                    <TextField id="standard-basic" label="Email" variant="standard" />
                    <TextField id="standard-basic" label="Prénom" variant="standard" />
                </Box>
                <Box sx={{display:'flex', justifyContent:'space-around', Width:'100%', marginBottom:'20px'}}>
                    {/* <Typography sx={{fontSize: '1.4rem', padding:'15px', fontFamily: 'montserrat', margin:'auto'}}>Mot de passe :</Typography> */}
                    <TextField id="standard-basic" label="Mot de passe" variant="standard" />
                    <TextField id="standard-basic" label="Nom" variant="standard" />
                </Box>
              </Box>
            </Card>
            <AccountM />
          </Box>
          <Card variant='outlined' sx={{border:'1px solid #4462A5', marginBottom:'30px', marginTop:'30px', marginLeft:'20px', width:'300px'}}>
            <Typography sx={{fontSize: '1.4rem', padding:'15px', fontFamily: 'montserrat'}}>Comptes enfants</Typography>
          </Card>
          <Box sx={{display:'flex', justifyContent:'space-around', alignItems:'center', width: '70%'}}>
            <Card variant='outlined' sx={{border:'1px solid #4462A5', marginBottom:'30px', marginTop:'30px', marginLeft:'20px', width:'70%'}}>
              <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start', Width:'100%', padding:'10px' }}>
                <Box sx={{display:'flex', Width:'100%', justifyContent:'space-around' }}>
                    
                    <TextField id="standard-basic" label="Nom" variant="standard" />
                  
                </Box>
                <Box sx={{display:'flex', justifyContent:'space-around', Width:'100%', marginBottom:'20px'}}>
                    
                    <TextField id="standard-basic" label="Mot de passe" variant="standard" />
                    
                </Box>
              </Box>
            </Card>
            <AccountM />
          </Box>
          <Box sx={{display:'flex', justifyContent:'space-around', alignItems:'center', width: '70%'}}>
            <Card variant='outlined' sx={{border:'1px solid #4462A5', marginBottom:'30px', marginTop:'30px', marginLeft:'20px', width:'70%'}}>
              <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start', Width:'100%', padding:'10px' }}>
                <Box sx={{display:'flex', Width:'100%', justifyContent:'space-around' }}>
                    
                    <TextField id="standard-basic" label="Nom" variant="standard" />
                  
                </Box>
                <Box sx={{display:'flex', justifyContent:'space-around', Width:'100%', marginBottom:'20px'}}>
                    
                    <TextField id="standard-basic" label="Mot de passe" variant="standard" />
                    
                </Box>
              </Box>
            </Card>
            <AccountM />
          </Box>
          <Card variant='outlined' sx={{border:'1px solid #4462A5', marginBottom:'30px', marginTop:'30px', marginLeft:'20px', width:'300px'}}>
            <Typography sx={{fontSize: '1.4rem', padding:'15px', fontFamily: 'montserrat'}}>Créer un nouveau profil</Typography>
          </Card>
          <Box sx={{display:'flex', justifyContent:'space-around', alignItems:'center', width: '70%'}}>
            <Card variant='outlined' sx={{border:'1px solid #4462A5', marginBottom:'30px', marginTop:'30px', marginLeft:'20px', width:'70%'}}>
              <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start', Width:'100%', padding:'10px' }}>
                <Box sx={{display:'flex', Width:'100%', justifyContent:'space-around' }}>
                    
                    <TextField id="standard-basic" label="Nom" variant="standard" />
                  
                </Box>
                <Box sx={{display:'flex', justifyContent:'space-around', Width:'100%', marginBottom:'20px'}}>
                    
                    <TextField id="standard-basic" label="Mot de passe" variant="standard" />
                    
                </Box>
              </Box>
            </Card>
            <Button>Valider</Button> 
          </Box>
        </Box>
    </div>
  )
}

export default AccountManagement