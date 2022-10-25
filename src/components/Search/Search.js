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

  // State Google API info
  let [googleSearch, setGoogleSearch] = useState([]);
  let ISBNList= [];

  // State ISBDN APi info


  // State and data for pagination
  const [CurrentPage, setCurrentPage] = useState(1);
  const PER_PAGE = 4;


  const count = Math.ceil(Cards.length / PER_PAGE);
  const _DATA = usePagination(Cards, PER_PAGE);

  const handleChange = (e, value) => {
    setCurrentPage(value);
    _DATA.jump(value);
  };
// ******************************************
  // // Api Call
  // useEffect(() => {
  //   if (itemToSearch) {
  //     setLoadingCards(true)
  //     axios.get(`https://api2.isbndb.com/books/${itemToSearch}`,

  //       {
  //         headers: {
  //           'Accept': '/',
  //           'Authorization': '48454_3adb165117c5b979bbc75eb560814297'
  //         }
  //       })


  //       .then((response) => {
  //         setCards(response.data.books);
  //         setLoadingCards(false);
  //         console.log(response.data.book.isbn, "test isbn search")
  //       })
  //       .catch((error) => {
  //         console.log('Erreur !', error);
  //       })
  //   }
  // }, [itemToSearch]);
// ***************************************************************
// !--------------------------TEST-------------------------------
//   async function getCharmandar(){
//     const pokemonListUrl = "https://pokeapi.co/api/v2/pokemon"

//     // get list of pokemon
//     const response = await fetch(pokemonListUrl)
//     const pokeList = await response.json()

//     // find charmander in the array of pokemon
//     const charmanderEntry = pokeList.find((poke) => poke.name === "charmandar")

//     // request the charmandar data
//     const response2 = await fetch(charmanderEntry.url)
//     const charmander = await response2.json()

//     // use the charmandar data as desired
// }

// getCharmander()

//? RECHERCHER LE MOT CLE DANS GOOGLE API

 // Api Call
 useEffect(() => {
  if (itemToSearch) {
    setLoadingCards(true)
    
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${itemToSearch}&key=AIzaSyAIaqSnvJ5hDzxn48QV-ZjVApmN4BXSWsc`,{ params: { maxResults: 3 } })
    .then((response) => {

      //? RECUPERER LA LISTE D'INFO => tableau d'objet google
      setGoogleSearch(response.data.items)
      
        })
  
      .catch((error) => {
        console.log('Erreur !', error);
      })
  }
}, [itemToSearch]);

console.log({googleSearch}, "informations initiales sur Google Book Api")

let bookIndex= 0;
//? POUR CHAQUE OBJET : récupération ISBN =>tableau d'ISBN
/**
 * 
 * @param {Array} initialSearchApi  Array of objects books get from the first API search
 * 
 */
  function isbnList (initialSearchApi){
    let indexToDelete = [];
    for (let book of googleSearch){
      console.log("***********book #"+ bookIndex +"*****************")
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
      //? Si n'existe pas: effacer l'objet: ne pourra pas être enregistrer en BDD sans cette clé

    console.log ({indexToDelete}, "index à détruire")
    for (let index in indexToDelete){
      delete(googleSearch[index])
      // googleSearch.slice(index)
    }
    console.log(googleSearch, "Après delete")


    return ISBNList;
  }
  console.log(isbnList({googleSearch}), "test list des ISBN");
 

//? REQUETE sur API2 avec la liste des ISBN valable récolté =>tableau d'objet API 2

//? COMPARER les valeurs pour créer un livre complet

//? Si tableau de livre complet: affichage

      // setCards(tableau de livres complets);
      // setLoadingCards(false);
  



// if(isbn !==''){
	// var book_complet={id:'',title:'', isbn_13:'', cover:'', authors:'', 'description':'', publisher:'', date:0, numberOfPages:0, 'id_worldcat':'','id_google':'','ASIN':'','url':'','isPartOf':'','position':''};
	// var book_g={id:'',title:'', isbn_13:'', cover:'', authors:'', 'description':'', publisher:'', date:0, numberOfPages:0, 'id_worldcat':'','id_google':'','ASIN':'','url':''};
	// var book_w={id:'',title:'', isbn_13:'', cover:'', authors:'', 'description':'', publisher:'', date:0, numberOfPages:0, 'id_worldcat':'','id_google':'','ASIN':'','url':'','isPartOf':'','position':''};
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
        <aside sx={{ width: '40%' }}>
          <HomeKidButtons />
          <BookIconeMenu />

        </aside>

        <Box sx={{ display: 'flex', marginLeft: { xs: '100px', sm:'0px' }, flexDirection: 'row' }}>
          <Box sx={{ display: 'flex', width: '70%', flexDirection: 'column', alignItems: 'center', ml: '3%' }}>
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