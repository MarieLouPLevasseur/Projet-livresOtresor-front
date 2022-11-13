import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Box, Button, Typography, Pagination, Card, CardMedia, CardContent, CardActions } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector,useDispatch } from 'react-redux';


import HomeCarousel from '../Home/HomeCarousel/HomeCarousel'
import HomeKidButtons from '../HomeKid/HomeKidButtons/HomeKidButtons'
import SearchBar from './SearchBar/SearchBar';
import usePagination from "./UsePagination";
import Loading from '../Loading/Loading';
import ImgCard from '../../assets/img/defaultCover.jpg'
import BookIconeMenu from '../Book/BookIconeMenu/BookIconeMenu';
import { searchBookIsbn,searchBookCover,searchBookTitle, searchBookDescription, searchBookAuthors, searchBookPublisher} from '../../features/book/searchBookSlice';


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
  
  // Set datas if User or Kid
  const isLogUser = useSelector((state) => state.user.isLogUser);
  const isLogKid = useSelector((state) => state.kid.isLogKid);
  

   // set token
   const token = useSelector(state => {
    if(isLogUser) {
      // console.log(state.user.token, "Token du User")
        return state.user.token
    }
    // console.log(state.kid.token, "Token du Kid")
    return state.kid.token;

   })
  
  //  Books
    // API infos
  let googleSearchInfo = []
  let isbnValidCodeList=[];
  let completeBookList = []
   //Search Book
//    function dispatchSearchBookInfos ( isbn, cover, description, title, authors, publisher) {
// console.log("je suis dans le nouveau dispatch")
// console.log(isbn, "test valeur isbn")
//           dispatch(searchBookAuthors(authors))
//           dispatch(cover(cover))
//           dispatch(isbn(isbn))
//           dispatch(description(description))
//           dispatch(title(title))
//           dispatch(publisher(publisher))
//     };

  // Api infos
    
    const apiEndpointApiKey = `/api/v1/apiKey`;
    const apiUrl = useSelector((state) => state.api.apiUrl);
    const [loadingApiKey, setLoadingApiKey] = useState(true);

    const [googleApiKey, setGoogleApiKey] = useState("");
    const [isbndbApiKey, setIsbndbApiKey] = useState("");


 

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
  
  const dispatch = useDispatch();
  function handleDispatchSearchBookInfo(book){

    console.log("je suis dans la fonction pour dispatch")
    console.log(book, "je teste 'book' ")
    console.log(book.isbn, "je teste 'book.isbn' ")


    // localStorage.setItem('searchBook', JSON.stringify({
    //   isbn: e.isbn,
    //   cover: e.cover,
    //   title: e.title,
    //   description: e.description,
    //   authors: e.authors,
    //   publisher: e.publisher,
    // }));

    
    dispatch(searchBookIsbn(book.isbn));
    dispatch(searchBookCover(book.cover));
    dispatch(searchBookTitle(book.title));
    dispatch(searchBookDescription(book.description));
    dispatch(searchBookPublisher(book.publisher));
    dispatch(searchBookAuthors(book.authors));
};
  /**
   * Search result on Google Book Api with itemToSearch given by user
   * @param {string} itemToSearch string given by user: key word to search on API
   */
   function googleApiBook(itemToSearch){
    // console.log("***********Search On Google APi Book ******************")
     // Api Call on Google Book

     return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${itemToSearch}&key=${googleApiKey}`,{ params: { maxResults: 10 } })
     .then((response) => {

       //? RECUPERER LA LISTE D'INFO => tableau d'objet google
      //  setGoogleSearch(response.data.items)
       googleSearchInfo = response.data.items
      //  console.log(response.data.items, "informations initiales depuis la fonction 'googleApiBook'")
     
       return response.data.items
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
    // console.log("************* ISBN LIST Function***************")
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
    }


    return ISBNList;
  }

    
  /**
   * Search result on Google Book Api with list of valid ISBN code
   * @param {Array} ISBNList list of valid ISBN code
   * 
   */
   async function isbnApi2Book(ISBNList){
    // console.log("************Function isbnApi2Book******************")
    const isbnApiResult = [];
        for (let isbn of ISBNList){
          const booksApi2 = await axios.get(`https://api2.isbndb.com/book/${isbn}`,

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
 * 
 * @param {Array} googleSearchInfo informations of books from initial Search from Google Api Books
 * @param {Array} ISBNDBSearchInfo informations of books from second Search from ISBNDB Api 
 * @param {Array} isbnValidCodeList List of Valid Code ISBN
 * @return {Object}
 */
  function completeBook( googleSearchInfo, ISBNDBSearchInfo, isbnValidCodeList){
    // console.log("************* Complete Book **********************")
   
      // ? --- For Each ISBN code Valid complete all key with Google Book OR ISBN DB Book -------

      // console.log(isbnValidCodeList, "List de codes ISBN valide dans complete Book")
      // console.log(completeBook, "je suis un complete book qui devrait etre vide")
      for (let isbnValid of isbnValidCodeList){

        // Set a complete new book
        let completeBook={id:'',title:'', isbn:'', cover:'', authors: [], 'description':'', publisher:''};

        let coverBook = "";

        // console.log("--je suis l'isbn Valid #: ", isbnValid);
        // console.log(completeBook, "je suis un completeBook ")
        
        // ? ------Check each google Book----------
          
          for (let gBook of googleSearchInfo){
            // console.log("----je suis un google book------")
            // console.log(gBook)
              if (gBook !== undefined){
                let isbn13=""
                for (let count = 0; count< gBook.volumeInfo.industryIdentifiers.length; count ++){

                  if( gBook.volumeInfo.industryIdentifiers[count].type ==="ISBN_13"){
                    isbn13 = gBook.volumeInfo.industryIdentifiers[count].identifier
                    // console.log("mon gbook iSBN est le: ", isbn13)
                  }
                }
                    if (isbn13 === isbnValid){
                    // I have the good ISBN : set information on complete Book
                      // console.log("le gBook a bien le bon ISBN: je traite les infos")
                      
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

                      // CoverBook
                      if (gBook.volumeInfo.imageLinks !== undefined){
                        // completeBook.title= gBook.volumeInfo.title + " "+ gBook.volumeInfo.subtitle
                        coverBook = gBook.volumeInfo.imageLinks.thumbnails;
                      }


                    }
                  }
              // console.log(completeBook, "completeBook a la fin d'un tour de gBook")
            }
            // ? -------- Check each ISBN DB Book-----------
            
            for (let iBook of ISBNDBSearchInfo){
              // console.log("----je suis un IsbnDB book------")
              // console.log(iBook, "isbn book")
              // console.log(iBook.data.book.isbn13, "test isbn API 2")
              if (iBook.data.book.isbn13 === isbnValid){
                // console.log("j'ai le bon ISBN je traite la demande")

                // Cover
                  //ISBN DB has cover: set ISBN DB
                if (iBook.data.book.image !== ""){

                  completeBook.cover = iBook.data.book.image
                }
                  //ISBN DB has no cover but google has: set google
                else if (iBook.data.book.image === "" && coverBook !== ""){
                  completeBook.cover = coverBook;
                }
                else{
                  completeBook.cover = "https://i.pinimg.com/564x/11/1b/59/111b5913903c2bfbe7f11487bb3f06f6.jpg"
                }
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
            // console.log(completeBook, "test complete book")
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
              // console.log(finalResult, "résultats finaux")
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

    useEffect(() => {
      if(token){
          // Get Api Keys
          axios.get(apiUrl + apiEndpointApiKey, {headers : {
            'Authorization': `Bearer ${token}`
          }
          })
          .then((response) => {
            // console.log(response.data);
            setLoadingApiKey(false);
            setGoogleApiKey(response.data.apiKeyGoogle);
            setIsbndbApiKey(response.data.apiKeyIsbndb);

          
          })
          .catch((error) => {
            console.log(error);
          })
     }

      if (itemToSearch) {
        setLoadingCards(true);

          searchBook(itemToSearch);
         
      }


    }, [itemToSearch || token ]);



// console.log(LoadingCards, 'test loadingCards')
  // console.log(Cards, "test cards")
  if (LoadingCards || loadingApiKey) {
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

        <Box sx={{ width: '70%', display: 'flex', marginLeft: { xs: '15%', sm:'0px' }, flexDirection: 'row' , justifyContent: 'center'}}>
          <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center', ml: '3%' }}>
            {!LoadingCards && (
              _DATA.currentData().map((data) => (
                <Card key={data.id} sx={{ marginTop:'30px', display: "flex", flexDirection: { xs: 'column', lg: 'row' }, alignItems: { xs: 'center' }, width: "100%", height: "50%", mb: 1.5 }}>
                  <CardMedia
                    sx={{ width: { xs: '40%', md: 'auto',lg:'auto' }, height: {xs: '120%', sm:'120%', md:'60%', lg:'70%'} }}
                    component="img"
                    image={data.cover}
                    alt="Book Cover"
                  />
                  <CardContent sx={{ width: '80%' }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{fontSize:{sm:'1.5em',md:'2em',lg:'2.3em'}}} >
                      {data.title}
                    </Typography>
                    <Typography sx={{ fontStyle: 'italic', maxLines: 4 , fontSize:{sm:'1em',md:'1.4em',lg:'1.6em'}}} variant="body2" color="text.secondary">
                      {data.description == null ? "Aucune description n'est disponible pour ce livre" : data.description.length > 300 ? `${data.description.substring(0, 300)}...` : data.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ width: '10%', marginTop: '5px', marginBottom: '10%', margin:'15px', justifyContent:'center' }}>
                    {/* TODO: CHANGE LINK by passing new value */}
                    {/* <Link to={`/recherche/voir-livre/${data.isbn13}`} style={{ textDecoration: 'none' }}> */}
                      <Button sx={{fontSize:{md:'1em',lg:'1em'}}} size="small"
                       onClick={()=> {handleDispatchSearchBookInfo(data)}}
                      //  onClick={(data) => {
                        // dispatchSearchBookInfos(data.isbn, data.cover, data.description, data.title, data.authors, data.puslisher);
                      // }}
                       >Voir le livre</Button>
                    {/* </Link> */}
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