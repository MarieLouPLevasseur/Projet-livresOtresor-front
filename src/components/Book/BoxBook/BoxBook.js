import React from 'react'
import { Box,  Typography } from '@mui/material'

import Cover from '../../../assets/img/defaultCover.jpg'

function BoxBook({ Book }) {
  return (
    <div>
      {/* <Box sx={{display:'flex',
                flexDirection: {md:'row', sm:'column',xs:'column'},
                justifyContent:'center',
                width:'100%',
                marginLeft:{md:5, l:5}
                
                }}> */}
      <Box sx={{ display: 'flex', padding: '20px', flexDirection: { xs: 'column', sd: 'row', md: 'row' }, width: '80%', margin: 'auto', ml:{md:10}, justifyItems:'center' }}>

        <Box 
          component="img"
          alt="Couverture d'un livre"
          src={Book.cover ? Book.cover : Cover}
          // sx={{
          //   height: 300,
          //   width: 250,
          //   // width: '40%',
          //   maxHeight: { xs: 200, md: 300 },
          //   maxWidth: { xs: 200, md: 300 },
          //   marginLeft: 20,
          //   marginRight:{xs:'10px'},
          //   marginBottom: {md:'15', xs:'5'},
          //   marginTop: {xs:'5px', md:'30px'},
          //   // margin: 'auto',
          //   justifyContent:'center'
          // }}
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
        {/* <Box sx={{width:{xs:'100%', md:'70%'}, textAlign: 'center', maxWidth:'70%'}}> */}
        <Box sx={{ display: 'flex', alignItems: 'start', width: '70%', flexDirection: { xs: 'column', sm: 'row' }, margin: 'auto' }}>

        <Box sx={{ width: { xs: '100%', md: '50%', sd: '30%' }, textAlign: 'center', margin: 'auto' }}>
               {/* <Box sx={{display:'flex'}}> */}
                    <Box sx={{display:'flex'}}>
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
                  </Box>
                <Box>
                  <Typography sx={{ mt: 3, mb: 1, fontFamily: 'Montserrat', fontWeight: 700 }}>
                     Description:
                  </Typography>
                  <Typography sx={{ m: 'auto', mt: 3, fontFamily: 'Montserrat', fontWeight: 300, width: '80%', fontStyle: 'italic', marginBottom: '30px' }}>
                    "{Book.description}"
                  </Typography>
                {/* </Box> */}
              </Box>

          {/* <Typography sx={{ mt: 3,mb: 1, fontFamily: 'Montserrat', fontWeight: 500 }}>
            Ecrit par
          </Typography>
          <Typography sx={{ mt: 1,mb: 3, fontFamily: 'Montserrat', fontWeight: 400 }}>
          {Book.authors.map((author) => (
                    author.name
                  ))}
          </Typography>
          <Typography sx={{ mt: 3,mb: 1, fontFamily: 'Montserrat', fontWeight: 500 }}>
            Aux éditions
          </Typography>
          <Typography sx={{ mt: 1,mb: 3, fontFamily: 'Montserrat', fontWeight: 400 }}>
          {Book.publisher}
          </Typography>
          <Typography sx={{ m: 'auto', mt: 3, fontFamily: 'Montserrat', fontWeight: 300, width: '80%', fontStyle: 'italic', marginBottom:'30px'}}>
          {Book.description}
          </Typography> */}
        </Box>
        </Box>
      </Box>
    </div>
  )
}

export default BoxBook