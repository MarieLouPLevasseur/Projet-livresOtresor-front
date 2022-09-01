import React from 'react'
import { Box, Rating, Typography } from '@mui/material'

import Cover from '../../../assets/img/defaultCover.jpg'

function BoxBook() {
  return (
    <div>
      <Box sx={{display:'flex', flexDirection:{xs:'column', md:'row'}, width:'100%'}}>
        <Box 
          component="img"
          alt="Couverture d'un livre"
          src={Cover}
          sx={{
            height: 300,
            width: 300,
            maxHeight: { xs: 200, md: 300 },
            maxWidth: { xs: 200, md: 300 },
            marginLeft: 20,
            marginRight:{xs:'20px'},
            marginBottom: 15,
            marginTop: {xs:'-40px', md:'30px'}
            // marginTop: 8
          }}
        />
        <Box sx={{width:{xs:'100%', md:'50%', marginLeft:'-45px', marginTop:'-120px'}, textAlign: 'center'}}>
          <Typography sx={{ mt: 8, fontFamily: 'Montserrat', fontWeight: 500 }}>
            Livre le plus récent ajouté
          </Typography>
          <Typography sx={{ mt: 3,mb: 3, fontFamily: 'Montserrat', fontWeight: 500 }}>
            le 29/08/2022
          </Typography>
          <Typography sx={{ mt: 3,mb: 3, fontFamily: 'Montserrat', fontWeight: 500 }}>
            Auteur
          </Typography>
          <Typography sx={{ mt: 3,mb: 3, fontFamily: 'Montserrat', fontWeight: 500 }}>
            Editeur
          </Typography>
          {/* <Rating name="read-only" precision={0.5} value={4.5} readOnly /> */}
          <Typography sx={{ m: 'auto', mt: 3, fontFamily: 'Montserrat', fontWeight: 300, width: '80%', fontStyle: 'italic'}}>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque congue sem ante, vitae vestibulum nisi consectetur eget. Maecenas luctus fermentum commodo. Maecenas id mauris maximus, dapibus ante eu, elementum nulla. Sed elit velit, venenatis quis est ac, porttitor dignissim magna. Integer non lectus sit amet ante elementum fringilla. Ut in varius leo."
          </Typography>
        </Box>
      </Box>
    </div>
  )
}

export default BoxBook