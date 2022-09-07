import React from 'react'
import { Typography, Box } from '@mui/material';

import './Book.scss'
import BookMenu from './BookMenu/BookMenu';
import BoxBook from './BoxBook/BoxBook';
import BookButton from './BookButton/BookButton';
import BookIconeMenu from './BookIconeMenu/BookIconeMenu';

function Book() {
  return (
    <div>
      <Typography component="h1" variant="h3" sx={{fontFamily:'montserrat', color:'#4462A5', mt:'20px', marginBottom:'20px' }}>
        Titre du livre
      </Typography>
      <Box sx={{display:'flex', justifyContent:'center', alignItems:'center',  padding:'20px', flexDirection:{xs:'column', sd:'column', md:'column'}, width:'80%', margin:'auto'}}>
          <BookMenu 	sx={{ display: { xs: 'none', sm: 'block' } }}/>
          <Box sx={{display:'flex', width:'100%'}}>
            <BookIconeMenu sx={{ display: { xs: 'block', sm: 'none' } }} />
            <BoxBook />
          </Box>
          <BookButton />
      </Box>
    </div>
  )
}

export default Book