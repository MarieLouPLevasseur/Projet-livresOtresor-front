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
  const { identifier } = useParams();
  console.log(identifier);

  // Local States
  const [Book, setBook] = useState([]);
  const [loadingBook, setLoadingBook] = useState(true);

  // Api Calls

  useEffect(() => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${identifier}&key=AIzaSyAIaqSnvJ5hDzxn48QV-ZjVApmN4BXSWsc`)
    .then((response) => {
      console.log(response.data.items[0].volumeInfo.title);
      setBook(response.data);
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
      <Box sx={{display:'flex', justifyContent:'center', alignItems:'center',  padding:'20px', flexDirection:{xs:'column', sd:'column', md:'column'}, width:'80%', margin:'auto'}}>
          <BookMenu 	sx={{ display: { xs: 'none', sm: 'block' } }}/>
      <Typography component="h1" variant="h3" sx={{fontFamily:'montserrat', color:'#4462A5', mt:'20px', marginBottom:'20px' }}>
        {Book.items[0].volumeInfo.title}
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