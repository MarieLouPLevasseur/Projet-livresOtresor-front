import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Button, Typography, Pagination, Card, CardMedia, CardContent, CardActions } from '@mui/material'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import {  Link } from 'react-router-dom';

import HomeCarousel from '../Home/HomeCarousel/HomeCarousel';
import HomeKidButtons from '../HomeKid/HomeKidButtons/HomeKidButtons';
import SearchBar from '../Search/SearchBar/SearchBar';
import usePagination from "../Search/UsePagination";
import Loading from '../Loading/Loading';

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

  // Local State
  const [Cards, setCards] = useState([]);
  const [CardsFilter, setCardsFilter] = useState([]);
  const [LoadingCards, setLoadingCards] = useState(true);
  const [LoadingCategories, setLoadingCategories] = useState(true);
  const [LoadingAuthors, setLoadingAuthors] = useState(true);

  // Local Select State
  const [category, setCategory] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [author, setAuthor] = useState("");
  const [authorsList, setAuthorsList] = useState([]);
  const [collection, setCollection] = useState("");

  // Local Search State
  const [Search, setSearch] = useState('');
  const [itemToSearch, setItemToSearch] = useState('');

  // Redux-toolkit state import
  const apiUrl = useSelector((state) => state.api.apiUrl);
  // const token = useSelector((state) => state.kid.token);
  // const kidId = useSelector((state) => state.kid.id)

  // *************************
 // Set datas if User or Kid
 const isLogUser = useSelector((state) => state.user.isLogUser);
 const isLogKid = useSelector((state) => state.kid.isLogKid);

 console.log(isLogUser);
 console.log(isLogKid);

// set token
 const token = useSelector(state => {
   if(isLogUser) {
       return state.user.token
   }
   return state.kid.token;
  })

// set id
 const kidId = useSelector(state => {
   if(isLogUser) {
       return state.user.kidId
   }
   return state.kid.id;
  })
  // *************************

  // State and data for pagination
  const [CurrentPage, setCurrentPage] = useState(1);
  const PER_PAGE = 4;

  const count = Math.ceil(CardsFilter.length / PER_PAGE);
  const _DATA = usePagination(CardsFilter, PER_PAGE);

  const handleChange = (e, value) => {
    setCurrentPage(value);
    _DATA.jump(value);
  };

  // Api Calls
  const apiEndpointAllBooks = `/api/v1/kids/${kidId}/books`
  const apiEndpointCategories = `/api/v1/categories`
  const apiEndpointAuthors = `/api/v1/kids/${kidId}/books/authors`

  // All Books at first
  useEffect(() => {
    if(kidId){
    axios.get(apiUrl + apiEndpointAllBooks, {headers : {
      'Authorization': `Bearer ${token}`
    }
    })
    .then((response) => {
      console.log(response.data.data)
      setCards(response.data.data);
      setCardsFilter(response.data.data);
      setLoadingCards(false);
    })
    .catch((error) => {
      console.log('Erreur !', error);
    })

    // call API for Categories 
    axios.get(apiUrl + apiEndpointCategories, {headers : {
      'Authorization': `Bearer ${token}`
    }
    })
    .then((response) => {
      console.log(response.data)
      setCategoriesList(response.data)
      setLoadingCategories(false);
    })
    .catch((error) => {
      console.log('Erreur !', error);
    })

    // call API for Authors
    axios.get(apiUrl + apiEndpointAuthors, {headers : {
      'Authorization': `Bearer ${token}`
    }
    })
    .then((response) => {
      console.log(response.data)
      setAuthorsList(response.data.authors)
      setLoadingAuthors(false);
    })
    .catch((error) => {
      console.log('Erreur !', error);
    })
  }
  }, [kidId]);
  
  // Handle Functions
  const handleChangeRead = () => {
    const booksRead = Cards.filter((books)=> {
      return books.is_read === true;
    });
    setCardsFilter(booksRead);
  }

  const handleChangeEnvy = () => {
    const booksEnvy = Cards.filter((books)=> {
      return books.is_read === false;
    });
    setCardsFilter(booksEnvy);
  }

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeAuthor = (event) => {
    setAuthor(event.target.value);
  };

  const handleChangeCollection = (event) => {
    setCollection(event.target.value);
  };

  useEffect(() => {
  if (category){
    setCardsFilter(CardsFilter.filter((book) => book.category.name === category));
  }
  if (author){
    setCardsFilter(CardsFilter.filter((book) => book.book.authors[0].name === author));
  }
  return () => {
    setCardsFilter(Cards);
  };
  }, [category, author]);

  useEffect(() => {
    setCardsFilter(CardsFilter.filter((item) => item.book.title.toLowerCase().includes(itemToSearch.toLowerCase())));
  }, [itemToSearch]);

  if (LoadingCards || LoadingCategories || LoadingAuthors) {
    return <Loading />
  }
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
          <SearchBar search={Search} setSearch={setSearch} setItemToSearch={setItemToSearch}/>
          <Box sx={{ display: "flex", width: "100%", justifyContent: 'center', mb: 3}}>
            <FormControl sx={{ width: '20%' }}>
              <InputLabel id="demo-simple-select-category">Catégorie</InputLabel>
                <Select
                  sx={{ width: "80%" }}
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
              <FormControl sx={{ width: '20%'}}>
                <InputLabel id="demo-simple-select-category">Auteur</InputLabel>
                <Select
                  sx={{ width: "80%" }}
                  labelId="demo-simple-select-category"
                  id="demo-simple-category"
                  value={author}
                  label="category"
                  onChange={handleChangeAuthor}
                >
                  {authorsList.map((data)=> (
                    <MenuItem key={data.id} value={data.name}>{data.name}</MenuItem>
                  ))};
                </Select>
              </FormControl>
              <FormControl sx={{ width: '20%'}}>
                <InputLabel id="demo-simple-select-category">Collection</InputLabel>
                <Select
                  sx={{ width: "80%" }}
                  labelId="demo-simple-select-collection"
                  id="demo-simple-collection"
                  value={collection}
                  label="collection"
                  onChange={handleChangeCollection}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', gap: '5%', mr: '4%', mb: 5 }}>
            <Button
              className="searchButton"
              type="submit"
              variant="contained"
              sx={{ width: '15%' }}
              onClick={() => setCardsFilter(Cards)}
            >
              Tous mes livres
            </Button>
            <Button
              className="searchButton"
              type="submit"
              variant="contained"
              sx={{ width: '15%' }}
              onClick={handleChangeRead}
            >
              Mes livres lus
            </Button>
            <Button
              className="searchButton"
              type="submit"
              variant="contained"
              sx={{ width: '15%' }}
              onClick={handleChangeEnvy}
            >
              Ma liste d'envie
            </Button>
          </Box>
          {_DATA.currentData().map((data) => (
          <Card key={data.id} sx={{ display: "flex", width: "100%", height: "50%", mb: 1.5 }}>
            <CardMedia
              sx={{ width: '15%', height: '100%' }}
              component="img"
              image={data.book.cover}
              alt="Book Cover"
            />
            <CardContent sx={{width: '80%'}}>
              <Typography gutterBottom variant="h5" component="div">
                {data.book.title}
              </Typography>
              <Typography sx={{ fontStyle: 'italic', maxLines: 4 }} variant="body2" color="text.secondary">
                {data.book.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ width: '10%' }}>
              <Link to={`/mes-livres/voir-livre/${data.book.id}`}>
                <Button size="small">Voir le livre</Button>
              </Link>
            </CardActions>
          </Card>
          ))}
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