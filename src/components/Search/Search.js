import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Box, Button, Typography, Pagination, Card, CardMedia, CardContent, CardActions } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import HomeCarousel from '../Home/HomeCarousel/HomeCarousel'
import HomeKidButtons from '../HomeKid/HomeKidButtons/HomeKidButtons'
import SearchBar from './SearchBar/SearchBar';
import usePagination from "./UsePagination";
import Loading from '../Loading/Loading';
import ImgCard from '../../assets/img/defaultCover.jpg'

import './Search.scss'

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

function Search() {
  
  // Local state
  const [Cards, setCards] = useState([]);
  const [LoadingCards, setLoadingCards] = useState(false)
  const [Search, setSearch] = useState('');
  const [itemToSearch, setItemToSearch] = useState('');

  // State and data for pagination
  const [CurrentPage, setCurrentPage] = useState(1);
  const PER_PAGE = 4;

  const count = Math.ceil(Cards.length / PER_PAGE);
  const _DATA = usePagination(Cards, PER_PAGE);

  const handleChange = (e, value) => {
    setCurrentPage(value);
    _DATA.jump(value);
  };

  // Api Call
    useEffect(() => {
      if(itemToSearch){
      setLoadingCards(true)
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${itemToSearch}&key=AIzaSyAIaqSnvJ5hDzxn48QV-ZjVApmN4BXSWsc`,{ params: { maxResults: 40 } })
      .then((response) => {
        setCards(response.data.items);
        setLoadingCards(false);
      })
      .catch((error) => {
        console.log('Erreur !', error);
      })
    }}, [itemToSearch]);

    console.log(Cards)

  if(LoadingCards){
    return <Loading />
  }
  return (
    <ThemeProvider theme={theme}>
    <div>
      <HomeCarousel />
      <Typography sx={{ mt: 3, mb: 3, fontWeight: 700, fontSize: 40, letterSpacing: 2, color: '#4462A5' }}>
        Trouve et ajoute ton livre !
      </Typography>
      <Box sx={{display: 'flex'}}>
        <HomeKidButtons />
      <Box sx={{display: 'flex', width: '70%', flexDirection: 'column', alignItems: 'center', ml:'3%' }}>
        <SearchBar search={Search} setSearch={setSearch} setItemToSearch={setItemToSearch} setLoadingCards={setLoadingCards}/>
        {!LoadingCards && (
        _DATA.currentData().map((data) => (
          <Card key={data.id} sx={{ display: "flex", width: "100%", height: "50%", mb: 1.5 }}>
            <CardMedia
              sx={{ width: '15%', height: '100%' }}
              component="img"
              image={ImgCard}
              alt="Book Cover"
            />
            <CardContent sx={{width: '80%'}}>
              <Typography gutterBottom variant="h5" component="div">
                {data.volumeInfo.title}
              </Typography>
              <Typography sx={{ fontStyle: 'italic', maxLines: 4 }} variant="body2" color="text.secondary">
                {data.volumeInfo.description == null ? "Aucune décription n'est disponible pour ce livre" : data.volumeInfo.description.length > 500 ? `${data.volumeInfo.description.substring(0, 500)}...` : data.volumeInfo.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ width: '10%' }}>
              <Link to={`/recherche/voir-livre/${data.volumeInfo.industryIdentifiers[0].identifier}`} style={{textDecoration:'none'}}>
                <Button size="small">Voir le livre</Button>
              </Link>
            </CardActions>
          </Card>
        ))
        )}

        <Pagination sx={{mt: 3, mb: 3}} count={count} page={CurrentPage} onChange={handleChange} />
      </Box>
      </Box>
    </div>
    </ThemeProvider>
  )
}

export default Search