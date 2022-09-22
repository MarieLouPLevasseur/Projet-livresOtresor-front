import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Typography, Box } from '@mui/material';

import './Book.scss'
import BookMenu from './BookMenu/BookMenu';
import BoxBook from './BoxBook/BoxBook';
import BookButton from './BookButton/BookButton';
import BookIconeMenu from './BookIconeMenu/BookIconeMenu';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Loading from '../Loading/Loading';

function Book() {

  // UseParams
  const { isbn13 } = useParams();
  console.log( isbn13, 'identifier');

  // Local States
  const [Book, setBook] = useState([]);
  const [loadingBook, setLoadingBook] = useState(true);

  // Api Calls
  useEffect(() => {
    // axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${identifier}&key=AIzaSyAIaqSnvJ5hDzxn48QV-ZjVApmN4BXSWsc`)
    axios.get(`https://api2.isbndb.com/book/${isbn13}`,
    // axios.get(`https://api2.isbndb.com/book/9780316358569`, 
            {
              headers : { 'Accept': '/',
                          'Authorization': '48454_3adb165117c5b979bbc75eb560814297'}
            })
    .then((response) => {
      console.log(response.data, 'response. data');
      setBook(response.data.book);
      console.log(Book, 'Book setter');
      console.log(Book.book.title, 'Book essai de titre');
      setLoadingBook(false)
    })
    .catch((error) => {
      console.log('Erreur !', error);
    });
  },[])

  if (loadingBook) {
    return <Loading />
  } 
  return (
    <div>
      <Box>
      <Typography>"TEST titre à supprimer:" {Book.title}</Typography> 
            </Box>
      <Box sx={{display:'flex', justifyContent:'center', alignItems:'center',  padding:'20px', flexDirection:{xs:'column', sd:'column', md:'column'}, width:'80%', margin:'auto'}}>
          <BookMenu 	sx={{ display: { xs: 'none', sm: 'block' } }}/>
      <Typography component="h1" variant="h3" sx={{fontFamily:'montserrat', color:'#4462A5', mt:'20px', marginBottom:'20px' }}>
        {Book.title}
      </Typography>
          <Box sx={{display:'flex', flexDirection: 'row', justifyContent:'center', width:'100%'}}>
            <BookIconeMenu sx={{ display: { xs: 'block', sm: 'none' } }} />
            <BoxBook Book={Book}/>
          </Box>
          <BookButton />
      </Box>
    </div>
  )
}

export default Book