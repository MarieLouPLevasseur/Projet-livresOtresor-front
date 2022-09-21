import React from 'react'
import { Box, Rating, Typography } from '@mui/material'

import Cover from '../../../assets/img/defaultCover.jpg'

function BoxBook({ Book }) {
  return (
    <div>
      <Box sx={{display:'flex', flexDirection: 'row', justifyContent:'center', width:'100%'}}>
        <Box 
          component="img"
          alt="Couverture d'un livre"
          src={Cover}
          sx={{
            height: 300,
            width: 250,
            maxHeight: { xs: 200, md: 300 },
            maxWidth: { xs: 200, md: 300 },
            marginLeft: 20,
            marginRight:{xs:'10px'},
            marginBottom: 15,
            marginTop: {xs:'5px', md:'30px'}
            // marginTop: 8
          }}
        />
        <Box sx={{width:{xs:'100%', md:'50%'}, textAlign: 'center'}}>
          <Typography sx={{ mt: 3,mb: 1, fontFamily: 'Montserrat', fontWeight: 500 }}>
            Ecrit par
          </Typography>
          <Typography sx={{ mt: 1,mb: 3, fontFamily: 'Montserrat', fontWeight: 400 }}>
          {Book.items[0].volumeInfo.authors}
          </Typography>
          <Typography sx={{ mt: 3,mb: 1, fontFamily: 'Montserrat', fontWeight: 500 }}>
            Aux éditions
          </Typography>
          <Typography sx={{ mt: 1,mb: 3, fontFamily: 'Montserrat', fontWeight: 400 }}>
          {Book.items[0].volumeInfo.publisher}
          </Typography>
          {/* <Rating name="read-only" precision={0.5} value={4.5} readOnly /> */}
          <Typography sx={{ m: 'auto', mt: 3, fontFamily: 'Montserrat', fontWeight: 300, width: '80%', fontStyle: 'italic', marginBottom:'30px'}}>
          "{Book.items[0].volumeInfo.description}"
          </Typography>
        </Box>
        </Box>
    </div>
  )
}

export default BoxBook