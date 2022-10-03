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
  console.log( identifier, 'identifier');

  // Local States
  const [Book, setBook] = useState([]);
  const [loadingBook, setLoadingBook] = useState(true);


  // Api Calls
  useEffect(() => {
    axios.get(`https://api2.isbndb.com/book/${identifier}`,
            {
              headers : { 'Accept': '/',
                          'Authorization': '48454_3adb165117c5b979bbc75eb560814297'}
            })
    .then((response) => {
      console.log(response.data, 'response. data');
      setBook(response.data.book);
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
        {Book.title}
      </Typography>
          <Box sx={{display:'flex', flexDirection: 'row', justifyContent:'center', width:'100%'}}>
            <BookIconeMenu sx={{ display: { xs: 'block', sm: 'none' } }} />
            <BoxBook Book={Book}/>
          </Box>
          <BookButton Book={Book}/>
      </Box>
    </div>
  )
}

export default Book