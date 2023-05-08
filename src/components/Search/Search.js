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

  //  Books
  // API infos
  let googleSearchInfo = []
  let isbnValidCodeList = [];
  let completeBookList = []
  let coverResponse = "";
  // Api infos

  const apiEndpointApiKey = `/api/v1/apiKey`;
  const apiUrl = useSelector((state) => state.api.apiUrl);
  // const [loadingApiKey, setLoadingApiKey] = useState(true);

  const [googleApiKey, setGoogleApiKey] = useState("");
  const [isbndbApiKey, setIsbndbApiKey] = useState("");




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

    console.log("je suis dans la fonction pour dispatch")
    console.log(book, "je teste 'book' ")
    console.log(book.isbn, "je teste 'book.isbn' ")

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
    console.log(Search, "Search du state")

    searchBook()

  }

  /**
   * Search result on Google Book Api with itemToSearch given by user
  //  * @param {string} itemToSearch string given by user: key word to search on API
   */
  function googleApiBook() {
    // console.log("***********Search On Google APi Book ******************")
    console.log(isbndbApiKey, "valeur isbnApiKey dans API 1");
    console.log(googleApiKey, "valeur googleApiKey dans API 1");

    // Api Call on Google Book
   
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${Search}&key=${googleApiKey}`, { params: { maxResults: 20 } })
      .then((response) => {

        //? RECUPERER LA LISTE D'INFO => tableau d'objet google
        //  setGoogleSearch(response.data.items)
        googleSearchInfo = response.data.items
        //  console.log(response.data.items, "informations initiales depuis la fonction 'googleApiBook'")

        return response.data.items
      })

  }

  /**
 * Filtered and list good ISBN code to use
 * @param {Array} resultGoogleApi result of the search on Google Api Book
 * @return {Array} List of ISBN code book from Search
 */
  function isbnList(resultGoogleApi) {
    // console.log("************* ISBN LIST Function***************")
    let bookIndex = 0;
    let indexToDelete = [];
    let ISBNList = [];

    for (let book of resultGoogleApi) {
      // console.log("-------------book # "+ bookIndex +"---------")
      // console.log({book}, "je suis book dans isbnList")
      // CHECK if Key Exist
      if (book.volumeInfo.industryIdentifiers !== undefined) {
        // (console.log("je ne suis pas ISBN undefined, j'existe!"));
        // SEARCH FOR ISBN 13
        // Check each key
        for (let count = 0; count < book.volumeInfo.industryIdentifiers.length; count++) {
          // console.log("je suis dans la boucle qui compte les types pour l'iSBN")
          // console.log("-----je teste les count: # ",count)



          if (book.volumeInfo.industryIdentifiers[count].type === "ISBN_13") {
            // console.log("j'ai bien une clé type = à ISBN13")
            let isbn13 = book.volumeInfo.industryIdentifiers[count].identifier

            // console.log("mon iSBN est le: ", isbn13)
            ISBNList.push(isbn13);
            isbnValidCodeList.push(isbn13)

          }

        }
      }
      if (book.volumeInfo.industryIdentifiers === undefined) {
        //Set off th List of results
        console.log("oups: industryIdentifier est UNdefined: je n'ai pas d'IBSN")
        // console.log(Search, "copy du state Search avant slice")
        indexToDelete.push(bookIndex);
        // console.log(googleSearch, "Après delete")

      }
      bookIndex++

    }
    //? Si n'existe pas: effacer l'objet: ne pourra pas être enregistré en BDD sans cette clé

    // console.log ({indexToDelete}, "index à détruire")
    for (let index of indexToDelete) {
      delete (resultGoogleApi[index])
    }

    console.log(ISBNList, "isbn List")
    return ISBNList;
  }




  /**
   * Search result on ISBN_API Book Api with list of valid ISBN code from Google Api Book
   * @param {Array} ISBNList list of valid ISBN code
   * 
   */
  async function isbnApi2Book(ISBNList) {
    // console.log("************Function isbnApi2Book******************")
    const isbnApiResult = [];
    // console.log({isbndbApiKey}, "valeur isbnApiKey dans API 2");
    // console.log({googleApiKey}, "valeur googleApiKey dans API 2");
    for (let isbn of ISBNList) {
      await axios.get(`https://api2.isbndb.com/book/${isbn}`,

        {
          headers: {
            'Accept': '/',
            'Authorization': `${isbndbApiKey}`
          }
        }
      )
        .then(result => {

          isbnApiResult.push(result)

          // console.log(result, "Réponse dans Api 2");
        })
        .catch(error => {
          // Handle error
          console.log(error);
          if (error.response) {
            // The client was given an error response (5xx, 4xx)
            console.log("response data: ", error.response.data);
            console.log("respsonse status: ", error.response.status);
            console.log("repseonse headers: ", error.response.headers);

          } else if (error.request) {
            // The client never received a response, and the request was never left
            console.log("request: ", error.request);

          } else {
            // Anything else
            console.log('Error: ', error.message);
          }
        });

    }
    return isbnApiResult

  }
 /**
   * Search result on OPEN_Library_API Book Api with list of valid ISBN code from Google Api Book
   * @param {Array} ISBNList list of valid ISBN code
   * 
   */
  async function openLibraryApiBook(ISBNList) {
    // console.log("************Function openLibraryApiBook******************")
    const openLibraryApiResult = [];
    for (let isbn of ISBNList) {
      await axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`,
        
      )
        .then(result => {
          // console.log(result)
          if (Object.keys(result.data).length > 0) {
            openLibraryApiResult.push(result);
        }
         
        })
        .catch(error => {
          // Handle error
          console.log(error);
          if (error.response) {
            // The client was given an error response (5xx, 4xx)
            console.log("response data: ", error.response.data);
            console.log("respsonse status: ", error.response.status);
            console.log("repseonse headers: ", error.response.headers);

          } else if (error.request) {
            // The client never received a response, and the request was never left
            console.log("request: ", error.request);

          } else {
            // Anything else
            console.log('Error: ', error.message);
          }
        });

    }
    return openLibraryApiResult

  }

/**
   * Search image on ISBN_API Book Api with isbn
   * @param {string} isbn ISBN code
   * 
   */
//  async function searchCoverLastChance($isbn){


    //  console.log("************searchCoverLastChance******************")

    //  try {
    //   const result = await axios.get(`https://api2.isbndb.com/book/${$isbn}`, {
    //     headers: {
    //       'Accept': '/',
    //       'Authorization': `${isbndbApiKey}`
    //     }
    //   });
    //   let lastChanceBook = result.data.book;
    //   if (lastChanceBook.hasOwnProperty('image') && lastChanceBook.image !== '') {
    //     let bookCover = lastChanceBook.image;
    //     console.log(bookCover, "bookCover dans getlastChanceApi");
    //     return bookCover;
    //   }
    // } catch (error) {
    //   console.log(error);
    //   if (error.response) {
    //     console.log("response data: ", error.response.data);
    //     console.log("respsonse status: ", error.response.status);
    //     console.log("repseonse headers: ", error.response.headers);
    //   } else if (error.request) {
    //     console.log("request: ", error.request);
    //   } else {
    //     console.log('Error: ', error.message);
    //   }
    // }

      
    // axios.get(`https://api2.isbndb.com/book/${$isbn}`, {
    //     headers: {
    //       'Accept': '/',
    //       'Authorization': `${isbndbApiKey}`
    //     }
    //   })

    //   .then((response) => {
    //     const book = response.data.book;
    //     if (book.hasOwnProperty('image') && book.image !== '') {
    //       const cover = book.image;
    //       coverResponse = cover;
    //       return cover;
    //     }

    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })

  // }

// !----------------------


/**
 * 
 * @param {Array} googleSearchInfo informations of books from initial Search from Google Api Books
 * @param {Array} OpenLibrarySearchInfo informations of books from second Search from ISBNDB Api 
 * @param {Array} ISBNDBSearchInfo informations of books from second Search from ISBNDB Api 
 * @param {Array} isbnValidCodeList List of Valid Code ISBN
 * @return {Object}
 */
  function completeBook(googleSearchInfo, OpenLibrarySearchInfo, isbnValidCodeList,ISBNDBSearchInfo) {
    // console.log("************* Complete Book **********************")

    // ? --- For Each ISBN code Valid complete all key with Google Book OR ISBN DB Book -------

    // console.log(isbnValidCodeList, "List de codes ISBN valide dans complete Book")
    // console.log(completeBook, "je suis un complete book qui devrait etre vide")
    for (let isbnValid of isbnValidCodeList) {
      console.log("-------------------------------");
      // Set a complete new book
      let completeBook = { id: '', title: '', isbn: '', cover: ImgCard, authors: [], description: '', publisher: '' };

      let coverBook = "";

      // console.log("--je suis l'isbn Valid #: ", isbnValid);
      // console.log(completeBook, "je suis un completeBook ")

      // ? ------Check each google Book----------

      for (let gBook of googleSearchInfo) {
        // console.log("----je suis un google book------")
        // console.log(gBook)
        if (gBook !== undefined) {
          let isbn13 = ""
          for (let count = 0; count < gBook.volumeInfo.industryIdentifiers.length; count++) {

            if (gBook.volumeInfo.industryIdentifiers[count].type === "ISBN_13") {
              isbn13 = gBook.volumeInfo.industryIdentifiers[count].identifier
              // console.log("mon gbook iSBN est le: ", isbn13)
            }
          }
          if (isbn13 === isbnValid) {
            // I have the good ISBN : set information on complete Book
            // console.log("le gBook a bien le bon ISBN: je traite les infos")

            // ISBN
            completeBook.isbn = isbn13
            //ID
            completeBook.id = gBook.id
            // TITLE ( and subtitle if exists)
            if (gBook.volumeInfo.subtitle !== undefined) {
              completeBook.title = gBook.volumeInfo.title + " " + gBook.volumeInfo.subtitle
            }
            else {

              completeBook.title = gBook.volumeInfo.title
            }

            // Description
            completeBook.description = gBook.volumeInfo.description

            // Publisher
            completeBook.publisher = gBook.volumeInfo.publisher

            // Authors
            if (gBook.volumeInfo.authors !== undefined) {

              for (let author of gBook.volumeInfo.authors) {
                completeBook.authors.push({ name: author })
              }
            }
            console.log("valeur imageLinks : ", gBook.volumeInfo.imageLinks !== undefined)
            // CoverBook
            if (gBook.volumeInfo.imageLinks) {
              // completeBook.title= gBook.volumeInfo.title + " "+ gBook.volumeInfo.subtitle
              coverBook = gBook.volumeInfo.imageLinks.thumbnail;
              // console.log("google Cover imageLinks", gBook.volumeInfo.imageLinks )
              completeBook.cover =coverBook;

              console.log("google Cover Book", coverBook )
            }


          }
        }
        // console.log(completeBook, "completeBook a la fin d'un tour de gBook")
      }
      
      // !! TEST POUR COMPLETE AVEC OPEN LIBRARY BOOK
      // ? -------- Check each Open Library Book-----------

      console.log(OpenLibrarySearchInfo);
      for (let oBook of OpenLibrarySearchInfo) {
        let openBook = oBook.data;
        console.log("----je suis un Open Library book------")
        // console.log(Object.keys(openBook)[0], "test OpenLibrayry API ISBN KEY")
        console.log(oBook, "Open book");
        if ((Object.keys(openBook)[0]!== undefined) && (Object.keys(openBook)[0] === `ISBN:${isbnValid}`)) {
          // console.log("j'ai le bon ISBN je traite la demande")

          // Cover
          //OpenLibrary has cover: set Open Library Cover
            if (openBook[`ISBN:${isbnValid}`].cover) { 
                // console.log("j'ai une image sur OpenLibrary")
                let openBookCover = openBook[`ISBN:${isbnValid}`].cover;
                
                
                if (openBookCover.hasOwnProperty('large')) { 
                    completeBook.cover = openBookCover.large
                } else if (openBookCover.hasOwnProperty('medium')) { 
                    completeBook.cover = openBookCover.medium

                } else if(openBookCover.hasOwnProperty('small')){ 
                    completeBook.cover = openBookCover.small

                }
                  // console.log(completeBook.cover, "completeBook?")
                  // console.log(coverBook, "google coverBook?")

            }

            // Publisher
              //OpenLibrary has publisher: set Open Library Publisher
            if (openBook[`ISBN:${isbnValid}`].publishers) { 
                let openBookPublisher = openBook[`ISBN:${isbnValid}`].publishers;
                
                
                if (completeBook.publisher == "") { 
                    completeBook.publisher = openBookPublisher[0].name

                }

            }
            // Authors

            if (completeBook.authors.length === 0) {
                  if (openBook[`ISBN:${isbnValid}`].authors) { 

                  let authors = openBook[`ISBN:${isbnValid}`].authors;
                  console.log( authors, "authors dans open book")
                    for (let author of authors){

                      completeBook.authors.push({ name: author.name })
                    }
                  }
            }
         
        }
        
      }

      // ? -------- Check each ISBN DB Book-----------

      for (let iBook of ISBNDBSearchInfo) {
        console.log("----je suis un IsbnDB book------")
        console.log(iBook, "isbn book")
        console.log(iBook.data.book.isbn13, "test isbn API 2")
        if (iBook.data.book.isbn13 === isbnValid) {
            console.log("j'ai le bon ISBN je traite la demande")
            let isbnCover       = '';
            let isbnDescription = "";
            let isbnPublisher   = "";
            let isbnAuthors     = [];

            // Cover
            if (iBook.data.book.image !== "") {
              console.log("j'ai une image sur ISBN")
              console.log(iBook.data.book.image, "image de ISBN")
              isbnCover = iBook.data.book.image;
              if(completeBook.cover == ImgCard){

                completeBook.cover = isbnCover;
              }

              console.log(completeBook.cover, "completeBook?")
            }
          
          // publisher
          if (completeBook.publisher === undefined) {
            isbnPublisher = iBook.data.book.publisher;
            // ! put regex to check data
            // ALPHï¿½E
            // const regex = new RegExp("^[a-zA-Z0-9]+$", "g");
            // console.log(regex().publisher, "test regex") 
            completeBook.publisher = isbnPublisher
          }
          // description
          if (completeBook.synopsis === "") {
            isbnDescription = iBook.data.book.synopsis;
            // ! put regex to check data
            // ALPHï¿½E
            // const regex = new RegExp("^[a-zA-Z0-9]+$", "g");
            // console.log(regex().publisher, "test regex") 
            completeBook.description = isbnDescription
          }
          // authors
          if (completeBook.authors.length === 0) {

            let isbnAuthors = iBook.data.book.authors;
            console.log( isbnAuthors, "authors dans ibook")
            for (let author of isbnAuthors){

              completeBook.authors.push({ name: author })
            }
          
          }
        }

      }
      // console.log(completeBook.cover);
      //   if(completeBook.cover == ImgCard){

      //       searchCoverLastChance(isbnValid).then((cover) => {
      //         completeBook.cover = cover;
      //         console.log(cover, "cover" );
      //         console.log(completeBook);
      //         console.log(completeBook.cover);
      //     });
            
      //   }

      // !!-------------------------------------------

      //? ---- For each book complete push in complete List Book-----
      console.log(completeBook, "test complete book")
      completeBookList.push(completeBook)
    }

    // console.log(completeBookList, "completeBookList avant soumission finale")
    return completeBookList
  }


  /**
   * Search on Api google Book, set ISBN list, Search on Api 2 isbn DB and fix final complete result on each book
   */
  function searchBook() {


    // ?-----1. Search google API Book code qui fonctionne ----------------------

    // // googleApiBook(itemToSearch)
    // googleApiBook()


    //   //?-----2. List all valid ISBN Code--------------------
    //   .then(resultGoogleApi => isbnList(resultGoogleApi)
    //     // console.log(resultGoogleApi, "test du premier résultat asyncrone:API 1: Google Api")
    //   )
    //   //?-----3. List all books on APi ISBN DB---------------
    //   // .then(resultIsbnList => isbnApi2Book(resultIsbnList)
    //   .then(resultIsbnList => openLibraryApiBook(resultIsbnList)

    //     // console.log(resultIsbnList, "test du retour sur la liste des code ISBN: isbnList")
    //   )
    //   //?-----4. Compare and complete list of books----------

    //   // .then(resultApi2Isbn => completeBook(googleSearchInfo, resultApi2Isbn, isbnValidCodeList)
    //   .then(resultOpenLibrary => completeBook(googleSearchInfo, resultOpenLibrary, isbnValidCodeList)

    //     // console.log(resultApi2Isbn, "test du retour asyncrone: Api 2: Isbn Api")
    //   )
    //   //?-----5.Return list of books completed---------------

    //   .then(finalResult => {
    //     // console.log(finalResult, "résultats finaux")
    //     setCompleteBookListState(finalResult)
    //     setCards(finalResult)
    //     setLoadingCards(false)
    //     return finalResult
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   });

    // ! test----------------

    googleApiBook()
        .then(resultGoogleApi => {
          // première fonction à exécuter
          return isbnList(resultGoogleApi);
        })
        .then(resultIsbnList => {
          // deuxième fonction à exécuter
          const openLibraryResult = openLibraryApiBook(resultIsbnList);
          const isbnApiResult = isbnApi2Book(resultIsbnList);
          return Promise.all([openLibraryResult, isbnApiResult]);
        })
        .then(([resultOpenLibrary, resultApi2Isbn]) => {
          // troisième fonction à exécuter
          const finalResult = completeBook(googleSearchInfo, resultOpenLibrary, isbnValidCodeList, resultApi2Isbn);
          setCompleteBookListState(finalResult);

        // Stocke les données dans la session
        sessionStorage.setItem('cards', JSON.stringify(finalResult));

          setCards(finalResult);
          setLoadingCards(false);
          return finalResult;
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

// Récupération des clés
    useEffect(() => {

    if (((googleApiKey === "") || (isbndbApiKey === "")) && (token !== "")) {
      axios.get(apiUrl + apiEndpointApiKey, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

        .then((response) => {
          // setLoadingApiKey(false);
          setGoogleApiKey(response.data.apiKeyGoogle);
          setIsbndbApiKey(response.data.apiKeyIsbndb);

          return true

        })
        .catch((error) => {
          console.log(error);
        })
    }

   

  },);

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
                <Card key={data.id} sx={{
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