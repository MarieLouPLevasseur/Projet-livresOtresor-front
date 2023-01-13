import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { TextField, Box, Button, Typography, Pagination, Card, CardMedia, CardContent, CardActions } from '@mui/material'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import HomeCarousel from '../Home/HomeCarousel/HomeCarousel';
import HomeKidButtons from '../HomeKid/HomeKidButtons/HomeKidButtons';
import SearchBar from '../Search/SearchBar/SearchBar';
import usePagination from "../Search/UsePagination";
import Loading from '../Loading/Loading';
import BookIconeMenu from '../Book/BookIconeMenu/BookIconeMenu';
import BookMenu from '../Book/BookMenu/BookMenu';

import './MyBooks.scss';

const theme = createTheme({
  palette: {
    primary: {
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
// TODO : dans la version mobile, ajouter un placement visuelle sur les réponses en descendant l'écran 
    // TODO : ou en affichant le nombre de réponse trouver (obligé de scroller pour voir s'il y a un élément....bof)
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


  // set token
  const token = useSelector(state => {
    if (isLogUser) {
      return state.user.token
    }
    return state.kid.token;
  })

  // set id
  const kidId = useSelector(state => {
    if (isLogUser) {
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
    if (kidId) {
      axios.get(apiUrl + apiEndpointAllBooks, {
        headers: {
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
      axios.get(apiUrl + apiEndpointCategories, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((response) => {
          // console.log(response.data, "categoriesList data")
          setCategoriesList(response.data)
          setLoadingCategories(false);
        })
        .catch((error) => {
          console.log('Erreur !', error);
        })

      // call API for Collections
      axios.get(apiUrl + apiEndpointCollections, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((response) => {
          setCollectionList(response.data)
          // console.log(response.data, "collectionsList data")
          setLoadingCollections(false);
        })
        .catch((error) => {
          console.log('Erreur !', error);
        })

      // call API for Authors
      axios.get(apiUrl + apiEndpointAuthors, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((response) => {
          // console.log(response.data, "authorsList data")
          setAuthorsList(response.data.authors)
          setLoadingAuthors(false);
        })
        .catch((error) => {
          console.log('Erreur !', error);
        })
    }

  }, [kidId, itemToSearch]);

  // Handle Functions
  const handleChangeRead = () => {
    const booksRead = Cards.filter((books) => {
      return books.is_read === true;
    });
    setCardsFilter(booksRead);
  }

  const handleChangeEnvy = () => {
    const booksEnvy = Cards.filter((books) => {
      return books.is_read === false;
    });
    setCardsFilter(booksEnvy);
  }

  const handleChangeCategory = (categorySelected) => {
    // console.log("********HANDLE CHANGE CATEGORY**********")
    setCategory(categorySelected);
    setCollection("");
    setAuthor("");

    // console.log("info entrant dans handleChangeCategory: ", categorySelected)

    // console.log("valeur de Cards: ", Cards)

    const categoryFiltered = Cards.filter((books) => {
      return (books.category.name == categorySelected);
    });
    // console.log("Filtre par la catégorie (categoryFiltered): ", categoryFiltered)
    setCardsFilter(categoryFiltered);
    // console.log(CardsFilter, "test cardFilter depuis handlechangeCategory")


  };


  const handleChangeAuthor = (authorSelected) => {
    // console.log("********HANDLE CHANGE AUTHOR**********")

    setAuthor(authorSelected);
    setCategory("");
    setCollection("");
    // console.log("info entrant dans handleChangeAuthor: ", authorSelected)
    const authorFiltered = Cards.filter((books) => {
      return (books.book.authors[0].name == authorSelected);
    });
    // console.log("Filtre par author (authorFiltered): ", authorFiltered)

    setCardsFilter(authorFiltered);
  };

  const handleChangeCollection = (collectionSelected) => {
    // console.log("********HANDLE CHANGE COLLECTION**********")

    setCollection(collectionSelected);
    setCategory("");
    setAuthor("");

    // console.log("info entrant dans handleChangeCollection: ", collectionSelected)
    const collectionFiltered = Cards.filter((books) => {

      return (books.series !== null ? books.series.name == collectionSelected : null == collection);
    });
    // console.log("Filtre par collection (collectionFiltered): ", collectionFiltered)

    setCardsFilter(collectionFiltered);

  };

  const handleSubmitSearch = () => {
    console.log("********HANDLE SUBMIT SEARCH**********")

    console.log("info entrant dans handleSubmitSearch : ", Search)
    const searchFiltered = Cards.filter((books) => {

      return (books.book.title.includes(Search) || books.book.description.includes(Search));
    });
    console.log("Filtre par mot de recherche (searchFiltered): ", searchFiltered)

    setCardsFilter(searchFiltered);

  };


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
        <Box sx={{ display: 'flex' }}>

          <HomeKidButtons />
          <BookIconeMenu/>
          {/* ------GLOBAL BAR-------- */}
          <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center', ml:{xs:'3%', sm:'0%'}  }} >
          <Box sx={{ display: 'flex', width: '70%', flexDirection: 'column', alignItems: 'center', ml: {xs:'3%', sm:'0%'} }}>              {/* <SearchBar search={Search} setSearch={setSearch} setItemToSearch={setItemToSearch} /> */}
              {/* ------------SEARCH BAR CHOICE ----------------------*/}
              <Box
                component="form"
                onSubmit={(e) => {
                  // setItemToSearch({Search})
                  e.preventDefault()
                  handleSubmitSearch({ Search })
                  setSearch("")
                }}

                sx={{
                  mt: 2,
                  mb: 5,
                  display: 'flex',
                  width: '100%',
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: 'center',

                }}
                autoComplete="off"
              >
                <TextField
                  value={Search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                  id="outlined-basic"
                  label="Recherche..."
                  variant="outlined"
                  sx={{ width: '70%', mr: 0.5 }}
                />
                <Button
                  className="searchButton"
                  type="submit"
                  variant="contained"
                  sx={{
                    maxWidth:'280px',
                    width: {xs:'80%',sm:"60%", md:'40%'},
                    margin: { xs: '15px', md: 'auto' },
                  }}
                >
                  C'est parti !
                </Button>
              </Box>
              {/*  -------LIST CHOICES---------------*/}
              <Box sx={{
                display: "flex",
                width: "100%",
                justifyContent: 'center',
                marginRight:"10%",
                mb: 3,
                flexDirection: { xs: "column", sm:"row" },
                
              }}
              >

                <FormControl sx={{ width: '100%',margin:{xs:"10px"} }}>
                  <InputLabel id="demo-simple-select-category">Catégorie</InputLabel>
                  <Select
                    sx={{ width: "100%",
                        }}
                    labelId="demo-simple-select-category"
                    id="demo-simple-category"
                    value={category}
                    label="category"
                    onChange={(e) => handleChangeCategory(e.target.value)}
                  >

                    {categoriesList.map((data) => (
                      <MenuItem key={data.id} value={data.name}>{data.name}</MenuItem>
                    ))};
                  </Select>
                </FormControl>
                <FormControl sx={{ width: '100%', margin:{xs:"10px"} }}>
                  <InputLabel id="demo-simple-select-author">Auteur</InputLabel>
                  <Select
                    sx={{ width: "100%",
                        }}
                    labelId="demo-simple-select-author"
                    id="demo-simple-author"
                    value={author}
                    label="author"
                    onChange={(e) => handleChangeAuthor(e.target.value)}

                  >

                    {authorsList.map((data) => (
                      <MenuItem key={data.id} value={data.name}>{data.name}</MenuItem>
                    ))};
                  </Select>
                </FormControl>
                <FormControl sx={{ width: '100%',margin:{xs:"10px"} }}>
                  <InputLabel id="demo-simple-select-collection">Collection</InputLabel>
                  <Select
                    sx={{ width: "100%"}}
                    labelId="demo-simple-select-collection"
                    id="demo-simple-collection"
                    value={collection}
                    label="collection"
                    onChange={(e) => handleChangeCollection(e.target.value)}


                  >

                    {collectionList.map((data) => (
                      <MenuItem key={data.id} value={data.name}>{data.name}</MenuItem>
                    ))};

                  </Select>
                </FormControl>
              </Box>
              {/* BOX CHOICES */}
              <Box sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    flexDirection: { xs: 'column', sm:'row'},
                    mr: '10%',
                    mb: 5
                  }}
                >
                <Button
                  className="searchButton"
                  type="submit"
                  variant="contained"
                  sx={{ width: '100%', margin:'10px' }}
                  onClick={() => setCardsFilter(Cards)}

                >
                  Tous mes livres
                </Button>
                <Button
                  className="searchButton"
                  type="submit"
                  variant="contained"
                  sx={{ width: '100%', margin:'10px' }}
                  onClick={handleChangeRead}
                >
                  Mes livres lus
                </Button>
                <Button
                  className="searchButton"
                  type="submit"
                  variant="contained"
                  sx={{ width: '100%', margin:'10px' }}
                  onClick={handleChangeEnvy}
                >
                  
                  Ma liste d'envie
                </Button>
              </Box>
            </Box>

            {/* ---------CARDS-------- */}
            {_DATA.currentData().map((data) => (
              <Card key={data.id} sx={{ display: "flex",
                                        flexDirection: {xs:'column',sm:'row'},
                                        justifyContent:{xs:'center'},
                                        width: {xs:"100%",sm:"80%"},
                                        mb: 1.5 
                                   }}>
                <CardMedia
                  sx={{ width: {xs:'100px',sm:'25%'},
                        maxWidth:{sm:'250px'},
                        alignSelf:'center'
                      }}
                  component="img"
                  image={data.book.cover}
                  alt="Book Cover"
                />

                <CardContent sx={{ width:{xs:"90%", sm: '95%'}}}>
                  <Typography gutterBottom variant="h5" component="div" sx={{textAlign:"center"}}>
                    {data.book.title}
                  </Typography>
                  <Typography gutterBottom variant="h7" component="div" >
                    Auteurs: {data.book.authors.map((author) => (author.name))}
                  </Typography>
                  <Typography sx={{ fontStyle: 'italic', maxLines: 4, textAlign:'justify' }} variant="body2" color="text.secondary" >
                    {data.book.description}
                  </Typography>
                  <Link to={`/mes-livres/voir-livre/${data.book.id}`} style={{ textDecoration: 'none', margin:'auto' }}>
                    <Button size="small" sx={{alignSelf:'center'}}>Voir le livre</Button>
                  </Link>
                </CardContent>
               
              </Card>
            ))}
            <Pagination sx={{ mt: 3, mb: 3 }} count={count} page={CurrentPage} onChange={handleChange} />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', width: '76%', justifyContent: 'flex-end', m: 'auto', mb: 1 }}>
          <Button
            className="searchButton"
            type="submit"
            variant="contained"
            sx={{ width: {xs:'100%',sm:"30%", md:'20%'},
                  marginLeft:{xs:'15%'},
                  mb:5 ,
                  justifyContent:'center',
                  padding:'auto'
                }}
          >
            Imprimer ma liste
          </Button>
        </Box>
      </div>
    </ThemeProvider>
  )
}

export default MyBooks