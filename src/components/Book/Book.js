import React, { useState, useEffect } from 'react'
import { Typography, Box } from '@mui/material';

import './Book.scss'
import BookMenu from './BookMenu/BookMenu';
import BoxBook from './BoxBook/BoxBook';
import BookButton from './BookButton/BookButton';
import BookIconeMenu from './BookIconeMenu/BookIconeMenu';
import { useSelector } from 'react-redux'
import Loading from '../Loading/Loading';
import HomeCarousel from '../Home/HomeCarousel/HomeCarousel';
import HomeKidButtons from '../HomeKid/HomeKidButtons/HomeKidButtons';


function Book() {

  // Local States
  const Book = useSelector((state) => state.searchBook);

  const [loadingBook, setLoadingBook] = useState(true);


  // Api Calls
  useEffect(() => {

    if (Book) {
      setLoadingBook(false)
    }

  }, [Book])

  if (loadingBook) {
    return <Loading />
  }
  return (
    <div>
      <HomeCarousel />
      <Box className="icone-menu" sx={{ position: 'relative' }} >
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>


            <BookIconeMenu sx={{ marginLeft: { xs: '5px', sm: '5px' }, display: { xs: 'block', sm: 'none' }, position: { xs: 'fixed', md: 'fixed' } }} />
          </Box>
          <Box sx={{ display: 'flex' }}>

            <HomeKidButtons />
            <BoxBook Book={Book} />
          </Box>
        <BookButton Book={Book} />
      </Box>


     
    </div>
  )
}

export default Book