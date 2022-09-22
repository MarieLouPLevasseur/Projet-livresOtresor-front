import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { Typography, Box, Button, Card, Rating, TextField, Grid } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

import BookMenu from '../Book/BookMenu/BookMenu';
import BookIconeMenu from '../Book/BookIconeMenu/BookIconeMenu';
import Loading from '../Loading/Loading';

import './BookConfig.scss'

function BookConfig() {
  
  // UseParams
  const { id } = useParams();
  console.log(id,'id');

  // Redux-toolkit state import
  const apiUrl = useSelector((state) => state.api.apiUrl);
  const token = useSelector((state) => state.kid.token);
  const kidId = useSelector((state) => state.kid.id);

  // Local States
  const [Book, setBook] = useState([]);
  const [loadingBook, setLoadingBook] = useState(true);
  const [LoadingCategories, setLoadingCategories] = useState(true);
  const [CardsFilter, setCardsFilter] = useState([]);
  const [LoadingCards, setLoadingCards] = useState(true);
  const [Cards, setCards] = useState([]);


  // Local Select State
  const [category, setCategory] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);


  // Api Calls
  const apiEndpointProgress = `/api/v1/kids/${kidId}/books/${id}`
  const apiEndpointCategories = `/api/v1/categories`

  useEffect(() => {
    if(kidId){
    axios.get(apiUrl + apiEndpointProgress, {headers : {
      'Authorization': `Bearer ${token}`
    }
    })
    .then((response) => {
      console.log(response.data);
      setBook(response.data);
      setLoadingBook(false)

    })
    .catch((error) => {
      console.log('Erreur !', error);
    });

 // call API for Categories 
    axios.get(apiUrl + apiEndpointCategories, {headers : {
      'Authorization': `Bearer ${token}`
    }
    })
    .then((response) => {
      console.log(response.data)
      setCategoriesList(response.data)
      setLoadingCategories(false);
      setCards(response.data);
      setCardsFilter(response.data);
      setLoadingCards(false);

    })
    .catch((error) => {
      console.log('Erreur !', error);
    });
  }}, [kidId]);


    const handleChangeCategory = (event) => {
      setCategory(event.target.value);
      if (category){
        setCardsFilter(Cards.filter((data) => data.name === category));
      }
    };
  if (loadingBook || LoadingCategories ||LoadingCards) {
    return <Loading/>
  }  
  return (
    <div>
        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center',  padding:'20px', flexDirection:{xs:'column', sd:'column', md:'column'}, width:'80%', margin:'auto'}}>
          <BookMenu sx={{ display: { xs: 'none', sm: 'block' } }}/>
          <Typography component="h1" variant="h3" sx={{fontFamily:'montserrat', color:'#4462A5', mt:'20px', marginBottom:'20px', marginLeft:{md:'-70px'} }}>
            {Book[0].book.title}
          </Typography>    
            <Box sx={{display:'flex', justifyContent:'center', width:'100%'}}>
              <BookIconeMenu sx={{ display: { xs: 'block', sm: 'none' } }} />
              <Box 
                component="img"
                alt="Couverture d'un livre"
                src={Book[0].book.cover}
                sx={{
                  height: 300,
                  width: 250,
                  maxHeight: { xs: 200, md: 300 },
                  maxWidth: { xs: 200, md: 300 },
                  marginLeft: 20,
                  marginRight:{xs:'10px'},
                  marginBottom: 15,
                  marginTop: {xs:'5px', md:'30px'}
                  // marginTop: 8
                }}
              />
              <Box sx={{width:{xs:'100%', md:'50%'}, textAlign: 'center'}}>
                <Typography sx={{ mt: 3,mb: 1, fontFamily: 'Montserrat', fontWeight: 500 }}>
                  Ecrit par
                </Typography>
                <Typography sx={{ mt: 1,mb: 3, fontFamily: 'Montserrat', fontWeight: 400 }}>
                {Book[0].book.authors[0].name}
                </Typography>
                <Typography sx={{ mt: 3,mb: 1, fontFamily: 'Montserrat', fontWeight: 500 }}>
                  Aux éditions
                </Typography>
                <Typography sx={{ mt: 1,mb: 3, fontFamily: 'Montserrat', fontWeight: 400 }}>
                {Book[0].book.publisher}
                </Typography>
                {/* <Rating name="read-only" precision={0.5} value={4.5} readOnly /> */}
                <Typography sx={{ m: 'auto', mt: 3, fontFamily: 'Montserrat', fontWeight: 300, width: '80%', fontStyle: 'italic', marginBottom:'30px'}}>
                "{Book[0].book.description}"
                </Typography>
              </Box>
          </Box>

        </Box>

    {/* ******************************************espace formulaire******************************* */}
      <Box sx={{marginBottom:'30px'}}>
        <Card variant='outlined' sx={{border:'1px solid #4462A5', marginBottom:'30px', marginTop:'30px', marginLeft:'20px', width:'85%', margin:'auto'}}>
            <Typography sx={{fontSize: '1.4rem', padding:'15px', fontFamily: 'montserrat', margin:'auto', color:'#4462A5'}}>Je peux choisir d'ajouter ou modifier des informations</Typography>

            {/* ------------- RATING ----------------------------- */}

            <Box sx={{display:'flex', flexDirection:{xs:'column', md:'row'}, justifyContent:'space-around', alignItems:'center'}}>
              <Typography sx={{fontSize: '1.4rem', padding:'15px', fontFamily: 'montserrat', margin:'auto', color:'#4462A5', marginRight:{md:'50px'}}}>J'ajoute une note :</Typography>
              <Box sx={{flexDirection:{xs:'column', md:'row'} , marginRight:{md:'600px'}}}>
                <ThumbDownIcon />
                <Rating />
                <ThumbUpIcon />
              </Box>
            </Box>
            <hr className='barre'/>
            {/* -----------COLLECTION SECTION --------------------------- */}
            {/* select collection by list */}
            <Typography sx={{fontSize: '1.4rem', padding:'15px', fontFamily: 'montserrat', margin:'auto', color:'#4462A5'}}>Si ce livre fait partie d'une série de livres, je peux l'ajouter à la collection</Typography>

            <Box sx={{display:'flex', flexDirection:{xs:'column', md:'row'}, justifyContent:'center', alignItems:'center', marginTop:'20px', width:'100%'}}>
                  <Typography sx={{fontSize: '1.4rem', padding:'15px', fontFamily: 'montserrat', margin:'auto', color:'#4462A5', width:'auto', marginLeft:{md:'500px'}}}>Je choisis une collection :</Typography>
                    {/* <Grid item xs={12} sm={6}> */}
                    <FormControl>
                      <InputLabel id="demo-simple-select-collection">collection à dynamiser</InputLabel>
                        <Select
                          sx={{width:{xs:'225px', md:'228px'}}}
                          labelId="demo-simple-select-collection"
                          id="demo-simple-collection"
                          label="collection"
                          
                        >
                          <MenuItem >test 1</MenuItem>
                          <MenuItem >test 2</MenuItem>
                          <MenuItem >test 3</MenuItem>
                        </Select>
                    </FormControl>
                  </Box>
           
              {/* Create a new collection name */}
              <Box sx={{display:'flex', flexDirection:{xs:'column', md:'row'}, justifyContent:'space-around', textAlign:'center', Width:'100%', padding:'10px', gap:'10px' }}>
                  <Typography sx={{fontSize: '1.4rem', padding:'30px', fontFamily: 'montserrat', color:'#4462A5'}}> ou je crée une nouvelle collection</Typography>
                    <Box sx={{display:'flex', Width:'100%', justifyContent:'space-around', mt:'18px' }}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                              autoComplete="given-name"
                              name="firstName"
                              fullWidth
                              id="firstName"
                              label="Nouvelle collection du livre"
                              autoFocus
                            />
                        </Grid>
                    </Box>

              {/* ------------- CATEGORY ----------------------------- */}
                  
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
                          value={category}
                          label="category"
                          onChange={handleChangeCategory}

                          
                        >
                           {categoriesList.map((data)=> (
                    <MenuItem key={data.id} value={data.name}>{data.name}</MenuItem>
                  ))};
                        </Select>
                    </FormControl>
                  </Box>
                {/* ------------- COMMENTS ----------------------------- */}

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
{console.log(category)}
                {/* ------------- READ OR WISHED ----------------------------- */}

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
            {/* ------------- SEND datas ----------------------------- */}

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