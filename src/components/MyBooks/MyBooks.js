import React, { useState } from 'react'
import axios from 'axios'
import { Box, Button, Typography, Pagination, Card, CardMedia, CardContent, CardActions } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import HomeCarousel from '../Home/HomeCarousel/HomeCarousel';
import HomeKidButtons from '../HomeKid/HomeKidButtons/HomeKidButtons';
import SearchBar from '../Search/SearchBar/SearchBar';
import usePagination from "../Search/UsePagination";
import MyBooksSelect from './MyBooksSelect/MyBooksSelect';
import ImgCard from '../../assets/img/defaultCover.jpg'

import './MyBooks.scss';

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

function MyBooks() {

    // Local state
    const [Books, setBookss] = useState([]);
    const [SearchBooks, setSearchBooks] = useState('');
    // const [itemToSearch, setItemToSearch] = useState('');
  
    // State and data for pagination
    const [CurrentPage, setCurrentPage] = useState(1);
    const PER_PAGE = 4;
  
    const count = Math.ceil(Books.length / PER_PAGE);
    const _DATA = usePagination(Books, PER_PAGE);
  
    const handleChange = (e, value) => {
      setCurrentPage(value);
      _DATA.jump(value);
    };

  return (
    <ThemeProvider theme={theme}>
    <div>
      <HomeCarousel />
      <Typography sx={{ mt: 3, mb: 3, fontWeight: 700, fontSize: 40, letterSpacing: 2, color: '#4462A5' }}>
        Mes livres
      </Typography>
      <Box sx={{display: 'flex'}}>
        <HomeKidButtons />
        <Box sx={{display: 'flex', width: '70%', flexDirection: 'column', alignItems: 'center', ml:'3%' }}>
          <SearchBar />
          <MyBooksSelect />
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', gap: '5%', mr: '4%', mb: 5 }}>
            <Button
              className="searchButton"
              type="submit"
              variant="contained"
              sx={{ width: '15%' }}
            >
              Tous mes livres
            </Button>
            <Button
              className="searchButton"
              type="submit"
              variant="contained"
              sx={{ width: '15%' }}
            >
              Mes livres lus
            </Button>
            <Button
              className="searchButton"
              type="submit"
              variant="contained"
              sx={{ width: '15%' }}
            >
              Ma liste d'envie
            </Button>
          </Box>
          <Card sx={{ display: "flex", width: "100%", height: "50%", mb: 1.5 }}>
            <CardMedia
              sx={{ width: '15%', height: '100%' }}
              component="img"
              image={ImgCard}
              alt="Book Cover"
            />
            <CardContent sx={{width: '80%'}}>
              <Typography gutterBottom variant="h5" component="div">
                Titre
              </Typography>
              <Typography sx={{ fontStyle: 'italic', maxLines: 4 }} variant="body2" color="text.secondary">
                Description
              </Typography>
            </CardContent>
            <CardActions sx={{ width: '10%' }}>
              <Button size="small">Voir le livre</Button>
            </CardActions>
          </Card>
        <Pagination sx={{mt: 3, mb: 3}} count={count} page={CurrentPage} onChange={handleChange} />
      </Box>
      </Box>
      <Box sx={{ display: 'flex', width: '76%', justifyContent: 'flex-end', m:'auto', mb: 1 }}>
        <Button
          className="searchButton"
          type="submit"
          variant="contained"
          sx={{ width: '15%' }}
        >
          Imprimer ma liste
        </Button>
      </Box>
    </div>
    </ThemeProvider>
  )
}

export default MyBooks