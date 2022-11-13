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


      {/* <Box sx={{display:'flex', justifyContent:'center', alignItems:'center',  padding:'20px', flexDirection:{xs:'column', sd:'column', md:'column'}, width:'80%', margin:'auto'}}>
          <BookMenu 	sx={{ display: { xs: 'none', sm: 'block' } }}/>
      <Typography component="h1" variant="h3" sx={{fontFamily:'montserrat', color:'#4462A5', mt:'20px', marginBottom:'20px' }}>
        {Book.title}
      </Typography> */}
      {/* <Typography component="h1" variant="h3" sx={{ fontFamily: 'montserrat', color: '#4462A5', mt: '20px', marginBottom: '20px', marginLeft: { md: '-70px' } }}>
          {Book.title}
        </Typography>

        <Box sx={{ display: 'flex' }}>
          <HomeKidButtons />

          <Box sx={{ display: 'flex', padding: '20px', flexDirection: { xs: 'column', sd: 'row', md: 'row' }, width: '80%', margin: 'auto', ml:{md:10}, justifyItems:'center' }}>

            <Box
              component="img"
              alt="Couverture d'un livre"
              src={Book.cover}
              sx={{
                height: 300,
                width: 250,
                maxHeight: { xs: 200, md: 300 },
                maxWidth: { xs: 200, md: 300 },
                margin: { sx: 'auto', sd: 'auto', md: 'auto' },
                alignItems: { sd: 'row' },
                alignSelf: 'center',
                
              }}
            />

<Box sx={{ display: 'flex', alignItems: 'start', width: '70%', flexDirection: { xs: 'column', sm: 'row' }, margin: 'auto' }}>

<Box sx={{ width: { xs: '100%', md: '50%', sd: '30%' }, textAlign: 'center', margin: 'auto' }}>
  <Typography sx={{ mt: 3, mb: 1, fontFamily: 'Montserrat', fontWeight: 700 }}>
    Ecrit par:
  </Typography>
  <Typography sx={{ mt: 1, mb: 3, fontFamily: 'Montserrat', fontWeight: 400 }}>
  {Book.authors.map((author) => (
                    author.name
                  ))}
  </Typography>
  <Typography sx={{ mt: 3, mb: 1, fontFamily: 'Montserrat', fontWeight: 700 }}>
    Aux éditions:
  </Typography>
  <Typography sx={{ mt: 1, mb: 3, fontFamily: 'Montserrat', fontWeight: 400 }}>
    {Book.publisher}
  </Typography>
  <Typography sx={{ mt: 3, mb: 1, fontFamily: 'Montserrat', fontWeight: 700 }}>
   Description:
  </Typography>
  <Typography sx={{ m: 'auto', mt: 3, fontFamily: 'Montserrat', fontWeight: 300, width: '80%', fontStyle: 'italic', marginBottom: '30px' }}>
    "{Book.description}"
  </Typography>
</Box>
</Box>

</Box> */}
      {/* </Box> */}
      {/* <BookIconeMenu sx={{ display: { xs: 'block', sm: 'none' } }} /> */}

      {/* </Box> */}
    </div>
  )
}

export default Book