import React, { useState, useEffect } from 'react'
import { Typography, Box } from '@mui/material';

import './Book.scss'
import BookMenu from './BookMenu/BookMenu';
import BoxBook from './BoxBook/BoxBook';
import BookButton from './BookButton/BookButton';
import BookIconeMenu from './BookIconeMenu/BookIconeMenu';
import { useSelector } from 'react-redux'
import Loading from '../Loading/Loading';

function Book() {

  // Local States
  const Book = useSelector((state) => state.searchBook);

  const [loadingBook, setLoadingBook] = useState(true);


  // Api Calls
  useEffect(() => {

    if(Book){
      setLoadingBook(false)
    }

  },[Book])

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