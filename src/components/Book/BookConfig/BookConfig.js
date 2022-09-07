import React from 'react'
import { Typography, Box, Button, Card, Rating, TextField, Grid } from '@mui/material';

import { NavLink } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';


import './BookConfig.scss'
import Cover from '../../../assets/img/defaultCover.jpg'

const theme = createTheme({
  palette:{
    primary:{
      main: '#4462A5',
    }
  },
});


function BookConfig() {
  return (
    <div>
      <Typography component="h1" variant="h3" sx={{fontFamily:'montserrat', color:'#4462A5', mt:'20px', marginBottom:'20px', marginLeft:{md:'-70px'} }}>
        Titre du livre
      </Typography>
      <Box sx={{display:'flex', justifyContent:'center', alignItems:'center',  padding:'20px', flexDirection:{xs:'column', sd:'column', md:'column'}, width:'80%', margin:'auto'}}>
          <Box className='bookMenu' sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Box sx={{ flexGrow: 1, display:'flex', flexDirection: 'column', maxWidth : '200px', display:{ xs: 'none', sm: 'block' }, marginLeft:'-300px'}}>
                {/* injection d'une Box pour responsive */}
                <Box display={'flex'} >
                    <Button
                      className='button'
                      sx={{ my: 2, color: 'red',fontFamily:'Montserrat', display: 'block', ml: 5, minWidth:'200px'}}
                    >
                      <NavLink
                        className={({ isActive }) => (isActive ? 'button button--active' : 'button')}
                        style={{ textDecoration: 'none'}}
                        to='/profil/enfant'
                      >
                        Accueil
                      </NavLink>
                    </Button>
                    <Button
                      className='button'
                      sx={{ my: 2, color: 'red',fontFamily:'Montserrat', display: 'block', ml: 5, minWidth:'200px' }}
                    >
                      <NavLink
                        className={({ isActive }) => (isActive ? 'button button--active' : 'button')}
                        style={{ textDecoration: 'none'}}
                        to='/mes-livres'
                      >
                        Mes livres
                      </NavLink>
                    </Button>
                </Box>
                <Box sx={{mt:'-12px'}} display={'flex'}>
                    <Button
                      className='button'
                      sx={{ my: 2, color: 'red',fontFamily:'Montserrat', display: 'block', ml: 5, minWidth:'200px'}}
                    >
                      <NavLink
                        className={({ isActive }) => (isActive ? 'button button--active' : 'button')}
                        style={{ textDecoration: 'none'}}
                        to='/recompenses'
                      >
                        Mes récompenses
                      </NavLink>
                    </Button>
                    <Button
                      className='button'
                      sx={{ my: 2, color: 'red',fontFamily:'Montserrat', display: 'block', ml: 5, minWidth:'200px'}}
                    >
                      <NavLink
                        className={({ isActive }) => (isActive ? 'button button--active' : 'button')}
                        style={{ textDecoration: 'none'}}
                        to='/recherche'
                      >
                        Recherche de livres
                      </NavLink>
                    </Button>
                </Box>
              </Box>
          </Box>
      </Box>
      <Box sx={{display:'flex', width:'100%'}}>
        <Box className='bookIconeMenu'>
            <ThemeProvider theme={theme}>
              <div>
                <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                    <Box sx={{display:'flex', flexDirection:'column'}} >
                        <Button>
                          <HomeIcon sx={{fontSize:'50px'}} />
                        </Button>
                        <Button>
                          <MenuBookIcon sx={{fontSize:'50px'}} />
                        </Button>
                        <Button>
                          <EmojiEventsIcon sx={{fontSize:'50px'}} />
                        </Button>
                        <Button>
                        <SearchIcon sx={{fontSize:'50px'}} />
                        </Button>
                    </Box>
                </Box>
              </div>
          </ThemeProvider>
        </Box>
        <Box className='boxBook'>
            <Box sx={{display:'flex', flexDirection:{xs:'column', md:'row'}, width:'100%'}}>
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
                  marginRight:{xs:'10px'},
                  marginBottom: 15,
                  marginTop: {xs:'5px', md:'30px'}
                  // marginTop: 8
                }}
              />
              <Box sx={{width:{xs:'100%', md:'50%', marginLeft:'-45px', marginTop:'-45px'}, textAlign: 'center'}}>
                <Typography sx={{ mt: 8, fontFamily: 'Montserrat', fontWeight: 500 }}>
                  Livre le plus récent ajouté
                </Typography>
                <Typography sx={{ mt: 3,mb: 3, fontFamily: 'Montserrat', fontWeight: 500 }}>
                  le 29/08/2022
                </Typography>
                <Typography sx={{ mt: 3,mb: 3, fontFamily: 'Montserrat', fontWeight: 500 }}>
                  Auteur
                </Typography>
                <Typography sx={{ mt: 3,mb: 3, fontFamily: 'Montserrat', fontWeight: 500 }}>
                  Editeur
                </Typography>
                {/* <Rating name="read-only" precision={0.5} value={4.5} readOnly /> */}
                <Typography sx={{ m: 'auto', mt: 3, fontFamily: 'Montserrat', fontWeight: 300, width: '80%', fontStyle: 'italic', marginBottom:'30px'}}>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque congue sem ante, vitae vestibulum nisi consectetur eget. Maecenas luctus fermentum commodo. Maecenas id mauris maximus, dapibus ante eu, elementum nulla. Sed elit velit, venenatis quis est ac, porttitor dignissim magna. Integer non lectus sit amet ante elementum fringilla. Ut in varius leo."
                </Typography>
              </Box>
          </Box>

        </Box>
      </Box>

    {/* ******************************************espace formulaire******************************* */}
      <Box sx={{marginBottom:'30px'}}>
        <Card variant='outlined' sx={{border:'1px solid #4462A5', marginBottom:'30px', marginTop:'30px', marginLeft:'20px', width:'85%', margin:'auto'}}>
            <Typography sx={{fontSize: '1.4rem', padding:'15px', fontFamily: 'montserrat', margin:'auto', color:'#4462A5'}}>Je peux choisir d'ajouter ou modifier des informations</Typography>
            <Box sx={{display:'flex', flexDirection:{xs:'column', md:'row'}, justifyContent:'space-around', alignItems:'center'}}>
              <Typography sx={{fontSize: '1.4rem', padding:'15px', fontFamily: 'montserrat', margin:'auto', color:'#4462A5', marginRight:{md:'50px'}}}>J'ajoute une note :</Typography>
              <Box sx={{flexDirection:{xs:'column', md:'row'} , marginRight:{md:'600px'}}}>
                <ThumbDownIcon />
                <Rating />
                <ThumbUpIcon />
              </Box>
            </Box>
            <hr className='barre'/>
            <Typography sx={{fontSize: '1.4rem', padding:'15px', fontFamily: 'montserrat', margin:'auto', color:'#4462A5'}}>Si ce livre fait partie d'une série de livres, je peux l'ajouter à la collection</Typography>
              <Box sx={{display:'flex', flexDirection:{xs:'column', md:'row'}, justifyContent:'space-around', textAlign:'center', Width:'100%', padding:'10px', gap:'10px' }}>
                  <Typography sx={{fontSize: '1.4rem', padding:'30px', fontFamily: 'montserrat'}}>Nom de la collection</Typography>
                    <Box sx={{display:'flex', Width:'100%', justifyContent:'space-around', mt:'18px' }}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                              autoComplete="given-name"
                              name="firstName"
                              fullWidth
                              id="firstName"
                              label="Collection du livre"
                              autoFocus
                            />
                        </Grid>
                    </Box>
                  <Typography sx={{fontSize: '1.4rem', padding:'30px', fontFamily: 'montserrat'}}>Le numéro de tome</Typography>
                    <Box sx={{display:'flex', Width:'100%', justifyContent:'space-around', mt:'18px' }}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                              autoComplete="given-name"
                              name="firstName"
                              fullWidth
                              id="firstName"
                              label="N° de tome"
                              autoFocus
                            />
                        </Grid>
                    </Box>
                  <Typography sx={{fontSize: '1.4rem', padding:'30px', fontFamily: 'montserrat'}}>Sous-titre</Typography>
                    <Box sx={{display:'flex', Width:'100%', justifyContent:'space-around', mt:'18px' }}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                              autoComplete="given-name"
                              name="firstName"
                              fullWidth
                              id="firstName"
                              label="Sous-titre"
                              autoFocus
                            />
                        </Grid>
                    </Box>
              </Box>
                <hr className='barre'/>
                {/* <FormControl sx={{ width: '20%' }}> */}
                  <Box sx={{display:'flex', flexDirection:{xs:'column', md:'row'}, justifyContent:'center', alignItems:'center', marginTop:'20px', width:'100%'}}>
                  <Typography sx={{fontSize: '1.4rem', padding:'15px', fontFamily: 'montserrat', margin:'auto', color:'#4462A5', width:'auto', marginLeft:{md:'500px'}}}>J'ajoute une catégorie :</Typography>
                    {/* <Grid item xs={12} sm={6}> */}
                    <FormControl>
                      <InputLabel id="demo-simple-select-category">Catégorie</InputLabel>
                        <Select
                          sx={{width:{xs:'225px', md:'228px'}}}
                          labelId="demo-simple-select-category"
                          id="demo-simple-category"
                          label="category"
                          
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                  </Box>
             
                <Box sx={{display:'flex', flexDirection:{xs:'column', md:'row'}, justifyContent:'center', alignItems:'center'}}>
                  <Typography sx={{fontSize: '1.4rem', padding:'15px', fontFamily: 'montserrat', margin:'auto', color:'#4462A5'}}>J'ajoute un commentaire :</Typography>
                  <Box sx={{display:'flex', flexDirection:{xs:'column', md:'row'}, Width:'100%', justifyContent:'space-around', mt:'18px', margin:'auto' }}>
                        <Grid item xs={12} sm={12}>
                          <TextField
                              autoComplete="given-name"
                              name="firstName"
                              fullWidth
                              id="fi"
                              label="Les petites notes personnelles"
                              autoFocus
                              width='100%'
                            />
                        </Grid>
                    </Box>
                </Box>
                <Box sx={{display:'flex', flexDirection:{xs:'column', md:'row'}, justifyContent:'center', alignItems:'center'}}>
                  <Typography sx={{fontSize: '1.4rem', padding:'15px', fontFamily: 'montserrat', margin:'auto', color:'#4462A5'}}>C'est un livre :</Typography>
                  <FormControl>
                    {/* <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel> */}
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      sx={{display:'flex', flexDirection:{xs:'column', md:'row'}}}
                    >
                      <FormControlLabel value="read" control={<Radio />} label="Que j'ai lu" />
                      <FormControlLabel value="urge" control={<Radio />} label="Dont j'ai envie" />
                    </RadioGroup>
                  </FormControl>
                </Box>
            <Box sx={{margin:'30px'}}>
                <Button
                className='button'
                sx={{ my: 2, color: 'red',fontFamily:'Montserrat', display: 'block', ml: 5, minWidth:'200px', margin:'auto'}}
              >
                Enregistrer les modifications
              </Button>
            </Box>
        </Card>
      </Box>

     
    </div>
  )
}

export default BookConfig