import React from 'react'
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Avatar from '@mui/material/Avatar';
import { Box, Typography, TextField, Card, Grid } from '@mui/material';
import AccountM from './AccountM/AccountM';
import Validate from './Validate/Validate';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './AccountManagement.scss';

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

function AccountManagement() {
  return (
    <ThemeProvider theme={theme}>
      <div>
          <Box sx={{display:'flex', alignItems:'start', flexDirection:'column' , Width:'100%' }}>
            <Box sx={{margin:'auto', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', mt:'20px'}}>
              <Avatar className='loginAvatar' sx={{ m: 1 }}>
                  <AutoStoriesIcon />
              </Avatar>
              <Typography component="h1" variant="h3" sx={{fontFamily:'montserrat', color:'#4462A5'}}>
                  Réglages
              </Typography>
            </Box>
            <Card variant='outlined' sx={{border:'1px solid #4462A5', marginBottom:'30px', marginTop:'30px', marginLeft:'20px', width:'300px'}}>
              <Typography sx={{fontSize: '1.4rem', padding:'15px', fontFamily: 'montserrat', margin:'auto', color:'white', background:'#4462A5'}}>Informations</Typography>
            </Card>
            <Box sx={{display:'flex', justifyContent:'space-around', alignItems:'center', width: '100%'}}>
              <Card variant='outlined' sx={{border:'1px solid #4462A5', marginBottom:'30px', marginTop:'30px', marginLeft:'20px', width:'70%'}}>
                <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start', Width:'100%', padding:'10px', gap:'10px'}}>
                  <Box sx={{display:'flex', flexDirection:{xs:'column', md:'row'}, Width:'100%', justifyContent:'space-around', gap:'10px' }}>
                    
                    <Grid item xs={12} sm={6} >
                        <TextField
                          fullWidth
                          id="email"
                          label="Email"
                          name="email"
                          autoComplete="email"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="given-name"
                          name="firstName"
                          fullWidth
                          id="firstName"
                          label="Prénom"
                          autoFocus
                        />
                      </Grid>
                  </Box>
                  <Box sx={{display:'flex', flexDirection:{xs:'column', md:'row'}, justifyContent:'space-around', Width:'100%', marginBottom:'20px', gap:'10px'}}>
                    
                      <Grid item xs={12} sm={6}>
                        <TextField
                        fullWidth
                        name="password"
                        label="Mot de passe"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          id="lastName"
                          label="Nom"
                          name="lastName"
                          autoComplete="family-name"
                        />
                      </Grid>
                  </Box>
                </Box>
              </Card>
              <AccountM />
            </Box>
            <Card variant='outlined' sx={{border:'1px solid #4462A5', marginBottom:'30px', marginTop:'30px', marginLeft:'20px', width:'300px'}}>
              <Typography sx={{fontSize: '1.4rem', padding:'15px', fontFamily: 'montserrat', color:'white', background:'#4462A5'}}>Comptes enfants</Typography>
            </Card>
            <Box sx={{display:'flex', justifyContent:'space-around', alignItems:'center', width: '100%'}}>
              <Card variant='outlined' sx={{border:'1px solid #4462A5', marginBottom:'30px', marginTop:'30px', marginLeft:'20px', width:'70%'}}>
                <Box sx={{display:'flex', flexDirection:{xs:'column', md:'row'}, justifyContent:'space-around', textAlign:'center', Width:'100%', padding:'10px', gap:'10px' }}>
                <Typography sx={{fontSize: '1.4rem', padding:'30px', fontFamily: 'montserrat'}}>Nom compte enfant</Typography>
                  <Box sx={{display:'flex', Width:'100%', justifyContent:'space-around', mt:'18px' }}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="given-name"
                            name="firstName"
                            fullWidth
                            id="firstName"
                            label="Prénom"
                            autoFocus
                          />
                      </Grid>
                  </Box>
                  <Box sx={{display:'flex', justifyContent:'space-around', Width:'100%', marginBottom:'20px', mt:'18px'}}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                        fullWidth
                        name="password"
                        label="Mot de passe"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        />
                      </Grid>
                  </Box>
                </Box>
              </Card>
              <AccountM />
            </Box>
            <Box sx={{display:'flex', justifyContent:'space-around', alignItems:'center', width: '100%'}}>
              <Card variant='outlined' sx={{border:'1px solid #4462A5', marginBottom:'30px', marginTop:'30px', marginLeft:'20px', width:'70%'}}>
              <Box sx={{display:'flex', flexDirection:{xs:'column', md:'row'}, justifyContent:'space-around', textAlign:'center', Width:'100%', padding:'10px', gap:'10px' }}>
                <Typography sx={{fontSize: '1.4rem', padding:'30px', fontFamily: 'montserrat'}}>Nom compte enfant</Typography>
                  <Box sx={{display:'flex', Width:'100%', justifyContent:'space-around', mt:'18px' }}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="given-name"
                            name="firstName"
                            fullWidth
                            id="firstName"
                            label="Prénom"
                            autoFocus
                          />
                      </Grid>
                  </Box>
                  <Box sx={{display:'flex', justifyContent:'space-around', Width:'100%', marginBottom:'20px', mt:'18px'}}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                        fullWidth
                        name="password"
                        label="Mot de passe"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        />
                      </Grid> 
                  </Box>
                </Box>
              </Card>
              <AccountM />
            </Box>
            <Card variant='outlined' sx={{border:'1px solid #4462A5', marginBottom:'30px', marginTop:'30px', marginLeft:'20px', width:'300px'}}>
              <Typography sx={{fontSize: '1.4rem', padding:'15px', fontFamily: 'montserrat', color:'white', background:'#4462A5'}}>Créer un nouveau profil</Typography>
            </Card>
            <Box sx={{display:'flex', justifyContent:'space-around', alignItems:'center', width: '100%'}}>
              <Card variant='outlined' sx={{border:'1px solid #4462A5', marginBottom:'30px', marginTop:'30px', marginLeft:'20px', width:'70%'}}>
              <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start', Width:'100%', padding:'10px', gap:'10px' }}>
                  <Box sx={{display:'flex', Width:'100%', justifyContent:'space-around' }}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="given-name"
                            name="firstName"
                            fullWidth
                            id="firstName"
                            label="Prénom"
                            autoFocus
                          />
                      </Grid>
                  </Box>
                  <Box sx={{display:'flex', justifyContent:'space-around', Width:'100%', marginBottom:'20px'}}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                        fullWidth
                        name="password"
                        label="Mot de passe"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        />
                      </Grid>
                  </Box>
                </Box>
              </Card>
              <Validate />
            </Box>
          </Box>
      </div>
    </ThemeProvider>
  )
}

export default AccountManagement