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
  const [completeBookListState, setCompleteBookListState] = useState([]);
  

  let googleSearchInfo = []
  let isbnValidCodeList=[];
  let completeBookList = []

  // State Google API info
  // const [googleSearch, setGoogleSearch] = useState([]);
  // State ISBDN APi info
  // let ISBNDBSearch =[];
  // const [ISBNDBSearch, setISBNDBSearch] = useState([]);

  // State ISBN of valid codes

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

     return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${itemToSearch}&key=AIzaSyAIaqSnvJ5hDzxn48QV-ZjVApmN4BXSWsc`,{ params: { maxResults: 10 } })
     .then((response) => {

       //? RECUPERER LA LISTE D'INFO => tableau d'objet google
      //  setGoogleSearch(response.data.items)
       googleSearchInfo = response.data.items
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
      // console.log("-------------book # "+ bookIndex +"---------")
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

                // console.log("mon iSBN est le: ", isbn13)
                ISBNList.push(isbn13);
                isbnValidCodeList.push(isbn13)

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

    // console.log ({indexToDelete}, "index à détruire")
    for (let index of indexToDelete){
      delete(resultGoogleApi[index])
      // googleSearch.slice(index, index)
    }
    // googleSearch.filter(function(val){return val});

    // isbnValidCodeList.push(ISBNList)

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

            // console.log(result, "Réponse dans Api 2");
          })
          
        }
        return isbnApiResult
        
  }

  /**
 * 
 * @param {Array} googleSearchInfo informations of books from initial Search from Google Api Books
 * @param {Array} ISBNDBSearchInfo informations of books from second Search from ISBNDB Api 
 * @param {Array} isbnValidCodeList List of Valid Code ISBN
 * @return {Object}
 */
  function completeBook( googleSearchInfo, ISBNDBSearchInfo, isbnValidCodeList){
    console.log("************* Complete Book **********************")
   
      // ? --- For Each ISBN code Valid complete all key with Google Book OR ISBN DB Book -------

      // console.log(isbnValidCodeList, "List de codes ISBN valide dans complete Book")
      console.log(completeBook, "je suis un complete book qui devrait etre vide")
      for (let isbnValid of isbnValidCodeList){

        // Set a complete new book
        let completeBook={id:'',title:'', isbn:'', cover:'', authors: [], 'description':'', publisher:''};

        console.log("--je suis l'isbn Valid #: ", isbnValid);
        // console.log(completeBook, "je suis un completeBook ")
        
        // ? ------Check each google Book----------
          
          for (let gBook of googleSearchInfo){
            console.log("----je suis un google book------")
            // console.log(gBook)
              if (gBook !== undefined){
                let isbn13=""
                for (let count = 0; count< gBook.volumeInfo.industryIdentifiers.length; count ++){

                  if( gBook.volumeInfo.industryIdentifiers[count].type ==="ISBN_13"){
                    isbn13 = gBook.volumeInfo.industryIdentifiers[count].identifier
                    console.log("mon gbook iSBN est le: ", isbn13)
                  }
                }
                    if (isbn13 === isbnValid){
                    // I have the good ISBN : set information on complete Book
                      console.log("le gBook a bien le bon ISBN: je traite les infos")
                      
                      // ISBN
                        completeBook.isbn = isbn13
                        //ID
                        completeBook.id =gBook.id
                      // TITLE ( and subtitle if exists)
                        if (gBook.volumeInfo.subtitle !== undefined){
                          completeBook.title= gBook.volumeInfo.title + " "+ gBook.volumeInfo.subtitle
                        }
                        else{
                          
                          completeBook.title = gBook.volumeInfo.title
                        }
                        
                      // Description
                        completeBook.description = gBook.volumeInfo.description
                        
                      // Publisher
                        completeBook.publisher = gBook.volumeInfo.publisher
                        
                      // Authors
                        for (let author of gBook.volumeInfo.authors){
                          completeBook.authors.push({name: author})
                        }

                    }
                  }
              // console.log(completeBook, "completeBook a la fin d'un tour de gBook")
            }
            // ? -------- Check each ISBN DB Book-----------
            
            for (let iBook of ISBNDBSearchInfo){
              console.log("----je suis un IsbnDB book------")
              console.log(iBook, "isbn book")
              // console.log(iBook.data.book.isbn13, "test isbn API 2")
              if (iBook.data.book.isbn13 === isbnValid){
                console.log("j'ai le bon ISBN je traite la demande")
                completeBook.cover = iBook.data.book.image
              }
              if(completeBook.publisher === undefined){
                let publisher = iBook.data.book.publisher;
                // ! put regex to check data
                // ALPHï¿½E
                // const regex = new RegExp("^[a-zA-Z0-9]+$", "g");
                // console.log(regex().publisher, "test regex") 
                completeBook.publisher= iBook.data.book.publisher
              }
            }
            
            //? ---- For each book complete push in complete List Book-----
            console.log(completeBook, "test complete book")
            completeBookList.push(completeBook)
          }
          
      // console.log(completeBookList, "completeBookList avant soumission finale")
      return completeBookList
  }

  

 /**
  * Search on Api google Book, set ISBN list, Search on Api 2 isbn DB and fix final complete result book
  * @param {string} itemToSearch key word to search for books
  */
  function searchBook(itemToSearch){


    // ?-----1. Search google API Book code qui fonctionne ----------------------

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

          .then(resultApi2Isbn=> completeBook(googleSearchInfo,resultApi2Isbn, isbnValidCodeList)
              // console.log(resultApi2Isbn, "test du retour asyncrone: Api 2: Isbn Api")
          )
    //?-----5.Return list of books completed---------------

            .then(finalResult=> {
              console.log(finalResult, "résultats finaux")
              setCompleteBookListState(finalResult)
              setCards(finalResult)
              setLoadingCards(false)
              return finalResult
            })
              .catch((error)=>{
                console.log(error)
              });

 //------------test pour le retour ----------------------


 // async function api1() {
    //   const response = await axios.get(...)
    //   setGoogleSearch(response.data.items)
    //   return response.data.items
    // }
       //?-----1. Search google API Book----------------------
    // const finalResponse = 
      //   async function globalResponse() {
      //  await googleApiBook(itemToSearch)
          
      //   //?-----2. List all valid ISBN Code--------------------
      //     .then(resultGoogleApi=> isbnList(resultGoogleApi)
      //         // console.log(resultGoogleApi, "test du premier résultat asyncrone:API 1: Google Api")
      //       )
      //   //?-----3. List all books on APi ISBN DB---------------
      //       .then(resultIsbnList=> isbnApi2Book(resultIsbnList)
      //             // console.log(resultIsbnList, "test du retour sur la liste des code ISBN: isbnList")
      //       )
      //   //?-----4. Compare and complete list of books----------

      //         .then(resultApi2Isbn=> completeBook(googleSearchInfo,resultApi2Isbn, isbnValidCodeList)
      //             // console.log(resultApi2Isbn, "test du retour asyncrone: Api 2: Isbn Api")
      //         )
      //   //?-----5.Return list of books completed---------------

      //           .then(finalResult=> {
      //             console.log(finalResult, "résultats finaux")
      //             setCompleteBookListState(finalResult)
      //             setCards(finalResult)
      //             setLoadingCards(false)
      //             // return finalResult
      //           })
      //             .catch((error)=>{
      //               console.log(error)
      //             });


      //   }
        // return finalResult
    //------------------test à faire avec Async / Await-------------------
  
    // async function api1() {
    //   const response = await axios.get(...)
    //   setGoogleSearch(response.data.items)
    //   return response.data.items
    // }

      //--------------------------------
   

    
  }

// !--------------------------NEW TEST marche presque: difficulté avec les cards-------------------------------
    useEffect(() => {
      if (itemToSearch) {
        setLoadingCards(true);

          searchBook(itemToSearch);
          // .then((response)=>{

          // })

        //? Si tableau de livre complet: affichage

      //  console.log(completeBookList.length>0, "test completeBookList est >0 ?")
      //     if (completeBookList.length >0 ) {
      //       setCompleteBookListState(completeBookList)
      //       setCards(completeBookListState);

      //       setLoadingCards(false);
            
          
      //     }
      }


    }, [itemToSearch]);

//!---------------test 2 crashtest----------------------------------------


// async function api1() {
    //   const response = await axios.get(...)
    //   setGoogleSearch(response.data.items)
    //   return response.data.items
    // }
// useEffect(() => {
//   // declare the async data fetching function
//   if (itemToSearch) {

//     setLoadingCards(true);


//       const searchBookUseEffect = async () => {
//         const response = await searchBook(itemToSearch);
//       // setCompleteBookListState(response)
//       return response

//       }

//       // call the function
//     const finalResult =  searchBookUseEffect()
//         .then((response)=>{
//           console.log(response, "réponse de searchBookseEffect")
//           setCards(completeBookListState);

//         })
//         // make sure to catch any error
//         .catch(console.error);

//         console.log( finalResult, 'test final result en UseEffect')
//     }
//   }, [itemToSearch]);

//! ----------------------------------------------------------- 
console.log(LoadingCards, 'test loadingCards')
  console.log(Cards, "test cards")
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
                  // console.log({data}, "test de data")
                <Card key={data.id} sx={{ display: "flex", flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'center' }, width: "100%", height: "50%", mb: 1.5 }}>
                  <CardMedia
                    sx={{ width: { xs: '40%', md: '15%' }, height: '100%' }}
                    component="img"
                    // image={data.volumeInfo.imageLinks ? data.volumeInfo.imageLinks.thumbnail : { ImgCard }}
                    image={data.cover}
                    alt="Book Cover"
                  />
                  <CardContent sx={{ width: '80%' }}>
                    <Typography gutterBottom variant="h5" component="div" >
                      {/* {data.volumeInfo.title} */}
                      {data.title}
                    </Typography>
                    <Typography sx={{ fontStyle: 'italic', maxLines: 4 }} variant="body2" color="text.secondary">
                      {/* {data.volumeInfo.description == null ? "Aucune description n'est disponible pour ce livre" : data.volumeInfo.description.length > 500 ? `${data.volumeInfo.description.substring(0, 500)}...` : data.volumeInfo.description} */}
                      {data.description == null ? "Aucune description n'est disponible pour ce livre" : data.description.length > 500 ? `${data.description.substring(0, 500)}...` : data.description}
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