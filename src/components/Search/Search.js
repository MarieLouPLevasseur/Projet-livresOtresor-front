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
import BookIconeMenu from '../Book/BookIconeMenu/BookIconeMenu';

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

  // Local state
  const [Cards, setCards] = useState([]);
  const [LoadingCards, setLoadingCards] = useState(false)
  const [Search, setSearch] = useState('');
  const [itemToSearch, setItemToSearch] = useState('');
  const [completeBookList, setCompleteBookList] = useState([]);
  

  // State Google API info
  const [googleSearch, setGoogleSearch] = useState([]);

  // State ISBDN APi info
  // let ISBNDBSearch =[];
  // const [ISBNDBSearch, setISBNDBSearch] = useState([]);



  // State and data for pagination
  const [CurrentPage, setCurrentPage] = useState(1);
  const PER_PAGE = 4;


  const count = Math.ceil(Cards.length / PER_PAGE);
  const _DATA = usePagination(Cards, PER_PAGE);

  const handleChange = (e, value) => {
    setCurrentPage(value);
    _DATA.jump(value);
  };


  // FUNCTIONS
  /**
   * Search result on Google Book Api with itemToSearch given by user
   * @param {string} itemToSearch string given by user: key word to search on API
   */
   function googleApiBook(itemToSearch){
    console.log("***********Search On Google APi Book ******************")
     // Api Call on Google Book

     return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${itemToSearch}&key=AIzaSyAIaqSnvJ5hDzxn48QV-ZjVApmN4BXSWsc`,{ params: { maxResults: 3 } })
     .then((response) => {

       //? RECUPERER LA LISTE D'INFO => tableau d'objet google
       setGoogleSearch(response.data.items)
       console.log(response.data.items, "informations initiales depuis la fonction 'googleApiBook'")
      // console.log(Promise.resolve(response.data.items), "test promise.resolve sur les infos google book")
      //  Promise.resolve(response.data.items)
      //  return Promise.resolve(response.data.items)
       return response.data.items
      // return "je suis la réponse en dur"
         })
   
      //  .catch((error) => {
      //    console.log(error);
      //  })
       
   }

  /**
 * Filtered and list good ISBN code to use
 * @param {Array} resultGoogleApi result of the search on Google Api Book
 * @return {Array} List of ISBN code book from Search
 */
   function isbnList (resultGoogleApi){
    console.log("************* ISBN LIST Function***************")
    let bookIndex= 0;
    let indexToDelete = [];
    let ISBNList= [];

    for (let book of resultGoogleApi){
      console.log("-------------book # "+ bookIndex +"---------")
      // console.log({book}, "je suis book dans isbnList")
      // CHECK if Key Exist
      if (book.volumeInfo.industryIdentifiers !== undefined){
        // (console.log("je ne suis pas ISBN undefined, j'existe!"));
        // SEARCH FOR ISBN 13
          // Check each key
          for (let count = 0; count< book.volumeInfo.industryIdentifiers.length; count ++){
            // console.log("je suis dans la boucle qui compte les types pour l'iSBN")
            // console.log("-----je teste les count: # ",count)

          

              if( book.volumeInfo.industryIdentifiers[count].type ==="ISBN_13"){
                // console.log("j'ai bien une clé type = à ISBN13")
                let isbn13 = book.volumeInfo.industryIdentifiers[count].identifier

                console.log("mon iSBN est le: ", isbn13)
                ISBNList.push(isbn13);
              }
          
          }
      }
      if (book.volumeInfo.industryIdentifiers === undefined){
        //Set off th List of results
        console.log("oups: industryIdentifier est UNdefined: je n'ai pas d'IBSN")
        // const Search = googleSearch
        // console.log(Search, "copy du state Search avant slice")
        indexToDelete.push(bookIndex);
        // delete(googleSearch[bookIndex])
        // console.log(googleSearch, "Après delete")
        // setGoogleSearch(Search)

      }
      bookIndex ++
 
    }
      //? Si n'existe pas: effacer l'objet: ne pourra pas être enregistré en BDD sans cette clé

    console.log ({indexToDelete}, "index à détruire")
    for (let index of indexToDelete){
      delete(resultGoogleApi[index])
      // googleSearch.slice(index, index)
    }
    // googleSearch.filter(function(val){return val});



    return ISBNList;
  }

    
  /**
   * Search result on Google Book Api with list of valid ISBN code
   * @param {Array} ISBNList list of valid ISBN code
   * 
   */
   async function isbnApi2Book(ISBNList){
    console.log("************Function isbnApi2Book******************")
    const isbnApiResult = [];
        for (let isbn of ISBNList){
          const booksApi2 = await axios.get(`https://api2.isbndb.com/book/${isbn}`,

              {
                headers: {
                  'Accept': '/',
                  'Authorization': '48454_3adb165117c5b979bbc75eb560814297'
                }
              }
          )   
          .then(result => {
            // setAnswer(result);
            // setISBNDBSearch(result);
            isbnApiResult.push(result)

            console.log(result, "Réponse dans Api 2");
          })
          
        }
        return isbnApiResult
        
  }

  /**
 * 
 * @param {Array} googleSearchInfo informations of books from initial Search from Google Api Books
 * @param {Array} ISBNDBSearchInfo informations of books from second Search from ISBNDB Api 
 * @return {Object}
 */
   function completeBook(googleSearch, ISBNDBSearchInfo){
    console.log("************* Complete Book **********************")
    // Set incomplete Book for Google info
      const googleBook={title:'', isbn:'', cover:'', authors: [{name:''}], 'description':'', publisher:''};

    // Set incomplete Book for ISBNDB info
      const isbndbBook={title:'', isbn:'', cover:'', authors: [{name:''}], 'description':'', publisher:''};

    // Set a complete new book
      const completeBook={title:'', isbn:'', cover:'', authors: [{name:''}], 'description':'', publisher:''};
      console.log(googleSearch, "test de googleSearch")
      console.log(ISBNDBSearchInfo, "test de ISBNDBSearchInfo")

      for (let gBook of googleSearch){
        console.log("----je suis un google book------")
        console.log(gBook)
      }
      for (let iBook of ISBNDBSearchInfo){
        console.log("----je suis un IsbnDB book------")
        console.log(iBook, "isbn book")
      }

      return completeBook
  }


 /**
  * Do asyncronous command: search on Api google Book, set ISBN list, Search on Api 2 isbn DB and fix final complete result book
  * @param {string} itemToSearch key word to search for books
  */
  function searchBook(itemToSearch){


   

    //---------------test 3 CA MARCHE----------------------
    //?-----1. Search google API Book----------------------

    googleApiBook(itemToSearch)
    
    //?-----2. List all valid ISBN Code--------------------
      .then(resultGoogleApi=> isbnList(resultGoogleApi)
          // console.log(resultGoogleApi, "test du premier résultat asyncrone:API 1: Google Api")
        )
    //?-----3. List all books on APi ISBN DB---------------
        .then(resultIsbnList=> isbnApi2Book(resultIsbnList)
              // console.log(resultIsbnList, "test du retour sur la liste des code ISBN: isbnList")
        )
    //?-----4. Compare and complete list of books----------

          .then(resultApi2Isbn=> completeBook(googleSearch, resultApi2Isbn)
              // console.log(resultApi2Isbn, "test du retour asyncrone: Api 2: Isbn Api")
          )
    //?-----5.Return list of books completed---------------

            .then(finalResult=> {
              console.log(finalResult, "résultats finaux")
            })
              .catch((error)=>{
                console.log(error)
              });



  

    //------------------test à faire avec Async / Await-------------------
  
    // async function api1() {
    //   const response = await axios.get(...)
    //   setGoogleSearch(response.data.items)
    //   return response.data.items
    // }

      //--------------------------------
   

    
  }

// !--------------------------NEW TEST-------------------------------
    useEffect(() => {
      if (itemToSearch) {
        searchBook(itemToSearch);


        //? Si tableau de livre complet: affichage

    // if (completeBookList !== []) {
    //   setCards(completeBookList);

    //   setLoadingCards(false);
      
    
    // }
      }


    }, [itemToSearch]);

//! -----------------------------------------------------------





// if(isbn !==''){
	// var book_complet={id:'',title:'', isbn_13:'', cover:'', authors:'', 'description':'', publisher:'', date:0, numberOfPages:0, 'id_worldcat':'','id_google':'','ASIN':'','url':'','isPartOf':'','position':''};
	// var book_a={id:'',title:'', isbn_13:'', cover:'', authors:'', 'description':'', publisher:'', date:0, numberOfPages:0, 'id_worldcat':'','id_google':'','ASIN':'','url':''};
// ! --------------------------------------------------------------
 

  console.log(Cards)
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
        <SearchBar search={Search} setSearch={setSearch} setItemToSearch={setItemToSearch} setLoadingCards={setLoadingCards} />
      <Box sx={{ width: '100%', display: 'flex' }}>
      
          <HomeKidButtons />
          <BookIconeMenu />

        <Box sx={{ width: '70%', display: 'flex', marginLeft: { xs: '100px', sm:'0px' }, flexDirection: 'row' }}>
          <Box sx={{ display: 'flex', width: '60%', flexDirection: 'column', alignItems: 'center', ml: '3%' }}>
            {!LoadingCards && (
              _DATA.currentData().map((data) => (
                <Card key={data.id} sx={{ display: "flex", flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'center' }, width: "100%", height: "50%", mb: 1.5 }}>
                  <CardMedia
                    sx={{ width: { xs: '40%', md: '15%' }, height: '100%' }}
                    component="img"
                    image={data.volumeInfo.imageLinks ? data.volumeInfo.imageLinks.thumbnail : { ImgCard }}
                    alt="Book Cover"
                  />
                  <CardContent sx={{ width: '80%' }}>
                    <Typography gutterBottom variant="h5" component="div" >
                      {data.volumeInfo.title}
                    </Typography>
                    <Typography sx={{ fontStyle: 'italic', maxLines: 4 }} variant="body2" color="text.secondary">
                      {data.volumeInfo.description == null ? "Aucune description n'est disponible pour ce livre" : data.volumeInfo.description.length > 500 ? `${data.volumeInfo.description.substring(0, 500)}...` : data.volumeInfo.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ width: '10%', marginTop: '5px', marginBottom: '30px' }}>
                    <Link to={`/recherche/voir-livre/${data.isbn13}`} style={{ textDecoration: 'none' }}>
                      <Button size="small">Voir le livre</Button>
                    </Link>
                  </CardActions>
                </Card>
              ))
            )}

            <Pagination sx={{ mt: 3, mb: 3 }} count={count} page={CurrentPage} onChange={handleChange} />
          </Box>
        </Box>

      </Box>

    </div>
    // </ThemeProvider>
  )
}

export default Search