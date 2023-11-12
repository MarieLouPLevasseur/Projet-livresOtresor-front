import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Box, Button, Typography, Pagination, Card, CardMedia, CardContent, CardActions, TextField } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';

import './SearchBar/SearchBar.scss'
import { AirlineSeatLegroomExtraOutlined, Padding, WorkHistoryTwoTone } from '@mui/icons-material'


import HomeCarousel from '../Home/HomeCarousel/HomeCarousel'
import HomeKidButtons from '../HomeKid/HomeKidButtons/HomeKidButtons'
// import SearchBar from './SearchBar/SearchBar';
import usePagination from "./UsePagination";
import Loading from '../Loading/Loading';
import ImgCard from '../../assets/img/defaultCover.jpg'
import BookIconeMenu from '../Book/BookIconeMenu/BookIconeMenu';
import { searchBookIsbn, searchBookCover, searchBookTitle, searchBookDescription, searchBookAuthors, searchBookPublisher } from '../../features/book/searchBookSlice';


import './Search.scss'
import { toBeEmpty } from '@testing-library/jest-dom/dist/matchers';

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

function Search() {

  const [searchQuery, setSearchQuery] = useState('');


  // Local state
  const [Cards, setCards] = useState([]);
  const [LoadingCards, setLoadingCards] = useState(false)
  const [Search, setSearch] = useState('');
  // const [lastChanceCover, setlastChanceCover] = useState('');
  // const [itemToSearch, setItemToSearch] = useState('');
  const [completeBookListState, setCompleteBookListState] = useState([]);

  // Set datas if User or Kid
  const isLogUser = useSelector((state) => state.user.isLogUser);
  // const isLogKid = useSelector((state) => state.kid.isLogKid);


  // set token
  const token = useSelector(state => {
    if (isLogUser) {
      // console.log(state.user.token, "Token du User")
      return state.user.token
    }
    // console.log(state.kid.token, "Token du Kid")
    return state.kid.token;

  })

  const apiUrl = useSelector((state) => state.api.apiUrl);

  // State and data for pagination
  const [CurrentPage, setCurrentPage] = useState(1);
  const PER_PAGE = 4;


  const count = Math.ceil(Cards.length / PER_PAGE);
  const _DATA = usePagination(Cards, PER_PAGE);
  // const apiKeyIsSet = setApiKeys()
  const handleChange = (e, value) => {
    setCurrentPage(value);
    _DATA.jump(value);
  };


  const dispatch = useDispatch();

  // ********** HandleSubmit **************

  /**
   * Dispatch information of a complete book in the store slice on click to view details of a book search
   * @param {object} book 
   */
  function handleDispatchSearchBookInfo(book) {

    // console.log("je suis dans la fonction pour dispatch")
    // console.log(book, "je teste 'book' ")
    // console.log(book.isbn, "je teste 'book.isbn' ")

    dispatch(searchBookIsbn(book.isbn));
    dispatch(searchBookCover(book.cover));
    dispatch(searchBookTitle(book.title));
    dispatch(searchBookDescription(book.description));
    dispatch(searchBookPublisher(book.publisher));
    dispatch(searchBookAuthors(book.authors));
  };

  //*********** Functions *****************

  /**
   * set informations of books to card to set to view with given item to search by user
   */
  function handleSubmitSearch(search) {
    // console.log("************HANDLE SUBMIT SEARCH **************")
    setLoadingCards(true);
    // e.preventDefault()
    // console.log(search, "test search dans le HandleSubmit")
    // setItemToSearch(search)
    setSearch(search)
    // console.log(Search, "Search du state")

    searchBook()

  }

// !----------------------

  /**
   * Search on Api google Book, set ISBN list, Search on Api 2 isbn DB and fix final complete result on each book
   */
  function searchBook() {

   

      axios.post(apiUrl + '/api/search', {
        searchQuery: Search
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      .then((response) => {
        console.log(response)
        console.log(response.data)
        // setLoadingApiKey(false);
        setCompleteBookListState(response.data.books);

        // Stocke les données dans la session
        sessionStorage.setItem('cards', JSON.stringify(response.data.books));

          setCards(response.data.books);
          setLoadingCards(false);
          // return response;
      })
      .catch((error) => {
        console.log(error);
      });

  }
// Remise à la page une par défaut lors d'une nouvelle recherche
  useEffect(() => {
    setCurrentPage(1);
    _DATA.jump(1);
  }, [Cards]);

// Appel des infos en session si une recherche antérieur a eut lieu
  useEffect(() => {
     const storedCards = sessionStorage.getItem('cards');
       if (storedCards) {
         setCards(JSON.parse(storedCards));
       }
  },[]);


  if (LoadingCards) {
    return <Loading />
  }
  return (
    // <ThemeProvider theme={theme}>
    <div>
      <HomeCarousel />
      <Typography sx={{ mt: 3, mb: 3, fontWeight: 700, fontSize: { xs: 25, sm: 40 }, letterSpacing: 2, color: '#4462A5' }}>
        Trouve et ajoute ton livre !
      </Typography>
      {/* <SearchBar search={Search} setSearch={setSearch} setItemToSearch={setItemToSearch} setLoadingCards={setLoadingCards} /> */}
      {/* SearchBar ----------------------*/}
      <Box
        component="form"
        onSubmit={(e) => {
          // setItemToSearch({Search})
          handleSubmitSearch({ Search })
          setSearch("")
        }}

        sx={{
          mt: 2,
          mb: 5,
          display: 'flex',
          width: { sm: '70%', md: '40%' },
          paddingLeft: { xs: '5em', sm: '8em' },
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          margin: { md: 'auto' },
          marginRight: { xs: '17%', sm: '20%' }

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
            width: { xs: '50%', md: '20%' },
            margin: { xs: '15px', md: 'auto' },
          }}
        >
          C'est parti !
        </Button>
      </Box>
      {/*  ----------------------*/}


      <Box sx={{ width: '100%', display: 'flex' }}>

        <HomeKidButtons />
        <BookIconeMenu />

        <Box sx={{ width: '70%', display: 'flex', marginLeft: { xs: '15%', sm: '0px' }, flexDirection: 'row', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center', ml: '3%' }}>
            {!LoadingCards && (
              _DATA.currentData().map((data) => (
                <Card key={data.isbn} sx={{
                                          marginTop: '30px',
                                          display: "flex",
                                          flexDirection: { xs: 'column', xl:'row' },
                                          alignItems: { xs: 'center' },
                                          width: "100%",  mb: 1.5,
                                          border:'groove'
                                           }}>
                  <CardMedia
                    sx={{ width: { xs: '40%', md: 'auto', lg: '20%' }, height: { xs: '120%', sm: '120%', md: '30%', lg: '70%' }, padding:5 }}
                    component="img"
                    image={data.cover}
                    alt="Book Cover"
                  />
                  <CardContent sx={{ width: '80%',boxSizing:'border-box'  }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: { sm: '1.5em', md: '2em', lg: '2.3em' } }} >
                      {data.title}
                    </Typography>
                    <Typography sx={{ margin:3, fontStyle: 'italic', maxLines: 4, fontSize: { sm: '1em', md: '1.4em', lg: '1.3em', textAlign:'justify' }, wordWrap: 'break-word' }} variant="body2" color="text.secondary">
                      {data.description == null ? "Aucune description n'est disponible pour ce livre" : data.description.length > 300 ? `${data.description.substring(0, 300)}...` : data.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ width: {md:'10%',lg:'auto'}, marginTop: '5px', justifyContent: 'center', paddingBottom: '10%'}}>
                    <Link to={`/recherche/voir-livre`} style={{ textDecoration: 'none' }}>
                      <Button sx={{ fontSize: { md: '1em', lg: '1em' }, color:'white',backgroundColor:"#4462A5", minWidth:"200px" }} size="small"
                        onClick={() => { handleDispatchSearchBookInfo(data) }}
                      >Voir le livre</Button>
                    </Link>
                  </CardActions>
                </Card>
              ))
            )}

            <Pagination sx={{ mt: 10, mb: 3 }} count={count} page={CurrentPage} onChange={handleChange} />
          </Box>
        </Box>

      </Box>

    </div>
    // </ThemeProvider>
  )
}

export default Search