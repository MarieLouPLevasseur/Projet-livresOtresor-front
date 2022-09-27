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
  const [LoadingCollections, setLoadingCollections] = useState(true);

  // Local Select State
  const [category, setCategory] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [author, setAuthor] = useState("");
  const [authorsList, setAuthorsList] = useState([]);
  const [collection, setCollection] = useState("");
  const [collectionList, setCollectionList] = useState("");

  // Local Search State
  const [Search, setSearch] = useState('');
  const [itemToSearch, setItemToSearch] = useState('');

  // Redux-toolkit state import
  const apiUrl = useSelector((state) => state.api.apiUrl);

  // *************************
 // Set datas if User or Kid
 const isLogUser = useSelector((state) => state.user.isLogUser);
 const isLogKid = useSelector((state) => state.kid.isLogKid);

//  console.log(isLogUser, "User is logged");
//  console.log(isLogKid, "Kid is logged");

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
  const apiEndpointCollections = `/api/v1/kids/${kidId}/bookkids/series`
  
  // All Books at first
  useEffect(() => {
    if(kidId){
    axios.get(apiUrl + apiEndpointAllBooks, {headers : {
      'Authorization': `Bearer ${token}`
    }
    })
    .then((response) => {
      console.log(response.data.data, "Cards")
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
      console.log(response.data, "categoriesList data")
      setCategoriesList(response.data)
      setLoadingCategories(false);
    })
    .catch((error) => {
      console.log('Erreur !', error);
    })

    // call API for Collections
    axios.get(apiUrl + apiEndpointCollections, {headers : {
      'Authorization': `Bearer ${token}`
    }
    })
    .then((response) => {
      // console.log(response.data)
      setCollectionList(response.data)
      console.log(response.data, "collectionsList data")
      setLoadingCollections(false);
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
      console.log(response.data, "authorsList data")
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
  // ! Bug ne rend pas les bonnes catégories dans le filtre
    // ! après test il semble que le filtres projette les résultats de la sélection précédente (il y a un phénomène de décalage ): 
      // ! ex: je sélectionne "Non-classé", rien ne se passe, je sélectionne "Aventure" les cartes de "non-classée son dispatchées" si je clique sur un 3e item dans la liste j'aurai la liste "Aventure"

    if (category){
      
      // setCardsFilter(Cards.filter((book) => book.category.name == category));
      let categoryFiltered = Cards.filter((books)=> {
        return books.category.name == {category};
      });
      setCardsFilter(categoryFiltered);
    }
  };


  const handleChangeAuthor = (event) => {
    setAuthor(event.target.value);
      // ! Bug ne rend pas les bons auteurs dans le filtre

    if (author){
      setCardsFilter(Cards.filter((book) => book.book.authors[0].name == author));
    }
  };

  const handleChangeCollection = (event) => {
    setCollection(event.target.value);

    if (collection){
      // ! Bug ne rend pas les bonnes collections dans le filtre
      // setCardsFilter(Cards.filter((book) => book.series.name === collection));
      // return()=>{
      setCardsFilter(Cards.filter((book) => book.series !== null ? book.series.name == collection: null == collection));
      // }
    }
  };

  // useEffect(() => {
  // if (category){
  //   setCardsFilter(Cards.filter((book) => book.category.name === category));
  // }
  // if (author){
  //   setCardsFilter(Cards.filter((book) => book.book.authors[0].name === author));
  // }
  // return () => {
  //   setCardsFilter(Cards);
  // };
  // }, [category, author]);

  useEffect(() => {
    setCardsFilter(CardsFilter.filter((item) => item.book.title.toLowerCase().includes(itemToSearch.toLowerCase())));
  }, [itemToSearch]);

  if (LoadingCards || LoadingCategories || LoadingAuthors || LoadingCollections) {
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
      {console.log(category, " current category value selected")}

                  {categoriesList.map((data)=> (
                    <MenuItem key={data.id} value={data.name}>{data.name}</MenuItem>
                  ))};
                </Select>
              </FormControl>
              <FormControl sx={{ width: '20%'}}>
                <InputLabel id="demo-simple-select-author">Auteur</InputLabel>
                <Select
                  sx={{ width: "80%" }}
                  labelId="demo-simple-select-author"
                  id="demo-simple-author"
                  value={author}
                  label="author"
                  onChange={handleChangeAuthor}
                >
      {console.log(author, " current author value selected")}

                  {authorsList.map((data)=> (
                    <MenuItem key={data.id} value={data.name}>{data.name}</MenuItem>
                  ))};
                </Select>
              </FormControl>
              <FormControl sx={{ width: '20%'}}>
                <InputLabel id="demo-simple-select-collection">Collection</InputLabel>
                <Select
                  sx={{ width: "80%" }}
                  labelId="demo-simple-select-collection"
                  id="demo-simple-collection"
                  value={collection}
                  label="collection"
                  onChange={handleChangeCollection}
                  
                >
    {console.log(collection, " current collection value selected")}

                {collectionList.map((data)=> (
                    <MenuItem key={data.id} value={data.name}>{data.name}</MenuItem>
                  ))};

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
    {console.log(CardsFilter, " current Cards filtered")}

            <CardContent sx={{width: '80%'}}>
              <Typography gutterBottom variant="h5" component="div">
                {data.book.title}
              </Typography>
              <Typography sx={{ fontStyle: 'italic', maxLines: 4 }} variant="body2" color="text.secondary">
                {data.book.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ width: '10%' }}>
              <Link to={`/mes-livres/voir-livre/${data.book.id}`} style ={{textDecoration: 'none'}}>
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