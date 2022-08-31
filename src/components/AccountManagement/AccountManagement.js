import React from 'react'
// import Card from '@mui/material/Card';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Avatar from '@mui/material/Avatar';
import { Box, Typography, TextField, Card, Grid } from '@mui/material';
import AccountM from './AccountM/AccountM';

import './AccountManagement.scss';

function AccountManagement() {
  return (
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
              <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start', Width:'100%', padding:'10px', gap:'10px' }}>
                <Box sx={{display:'flex', Width:'100%', justifyContent:'space-around', gap:'10px' }}>
                   
                    {/* <TextField id="standard-basic" label="Email" variant="standard" />
                    <TextField id="standard-basic" label="Prénom" variant="standard" /> */}
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
                <Box sx={{display:'flex', justifyContent:'space-around', Width:'100%', marginBottom:'20px', gap:'10px'}}>
                    {/* <Typography sx={{fontSize: '1.4rem', padding:'15px', fontFamily: 'montserrat', margin:'auto'}}>Mot de passe :</Typography> */}
                    {/* <TextField id="standard-basic" label="Mot de passe" variant="standard" />
                    <TextField id="standard-basic" label="Nom" variant="standard" /> */}
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
              <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start', Width:'100%', padding:'10px', gap:'10px' }}>
                <Box sx={{display:'flex', Width:'100%', justifyContent:'space-around' }}>
                    
                    {/* <TextField id="standard-basic" label="Nom" variant="standard" /> */}
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
                    
                    {/* <TextField id="standard-basic" label="Mot de passe" variant="standard" /> */}
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
            <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start', Width:'100%', padding:'10px', gap:'10px' }}>
                <Box sx={{display:'flex', Width:'100%', justifyContent:'space-around' }}>
                    
                    {/* <TextField id="standard-basic" label="Nom" variant="standard" /> */}
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
                    
                    {/* <TextField id="standard-basic" label="Mot de passe" variant="standard" /> */}
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
                    
                    {/* <TextField id="standard-basic" label="Nom" variant="standard" /> */}
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
                    
                    {/* <TextField id="standard-basic" label="Mot de passe" variant="standard" /> */}
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
        </Box>
    </div>
  )
}

export default AccountManagement