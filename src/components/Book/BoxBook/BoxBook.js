import React from 'react'
import { Box,  Typography } from '@mui/material'

import Cover from '../../../assets/img/defaultCover.jpg'

function BoxBook({ Book }) {
  return (
    <div>
     
      <Box sx={{ display: 'flex',
                 padding: '20px',
                 flexDirection: { xs: 'column', sd: 'row', md: 'row', lg:'column' },
                 width: '80%',
                 margin: 'auto',
                 ml:{md:10},
                 justifyItems:'center',
                alignItems:{lg: 'center'}
              }}>

    {/* ------- Wrapper: IMAGE +(Author Publisher)  -------*/}
      <Box sx={{ display:{md:'flex'}, flexDirection:{md:'column', lg:'row'}}}>
          {/* ------- COVER -------*/}
            <Box 
              component="img"
              alt="Couverture d'un livre"
              src={Book.cover ? Book.cover : Cover}

              sx={{
                height: 300,
                width: 250,
                maxHeight: { xs: 200, md: 300 },
                maxWidth: { xs: 200, md: 300 },
                margin: { sx: 'auto', sd: 'auto', md: 'auto' },
                marginRight:{lg:15},
                alignItems: { sd: 'row' },
                alignSelf: 'center',
                order:{md:1}
                
              }}
            />

          {/* ------- Wrapper: (Author Publisher) + (Description) -------*/}

            {/* ------- Wrapper: Author + Publisher -------*/}
            <Box sx={{display:'flex', flexDirection: {xs:'column',sm:'row', md:'column'}, order:{md:3}, justifyContent:{sm:'space-evenly'}, wrap:'wrap'}}>

              {/* ------- AUTHOR -------*/}
                    <Box sx={{display:'flex', flexDirection:'column'}}>
                        <Typography sx={{ mt: 2, mb: 1, fontFamily: 'Montserrat', fontWeight: 700, width:{sm:'100%'} }}>
                          Ecrit par:
                        </Typography>
                        <Typography sx={{ m: 'auto', mt: 2, fontFamily: 'Montserrat', fontWeight: 300, width: '80%', fontStyle: 'italic', marginBottom: {xs:2, sm:'30px'} }}>

                        {Book.authors.map((author) => (
                            author.name
                          ))}
                        </Typography>
                    </Box>
                {/* -------- PUBLISHER ----------- */}
                    <Box sx={{display:'flex', flexDirection:'column'}}>

                    <Typography sx={{ mt: 2, mb: 1, fontFamily: 'Montserrat', fontWeight: 700, width:{sm:'100%'} }}>
                          Aux éditions:
                        </Typography>
                        <Typography sx={{ m: 'auto', mt: 2, fontFamily: 'Montserrat', fontWeight: 300, width: '80%', fontStyle: 'italic', marginBottom: {xs:2, sm:'30px'} }}>

                          {Book.publisher}
                        </Typography>
                    </Box>
              </Box>
              </Box>         
           {/* -------- DESCRIPTION --------- */}
                <Box sx={{ order:{md:2}}}>
                  <Typography sx={{ mt: 2, mb: 1, fontFamily: 'Montserrat', fontWeight: 700, textAlign:'center' }}>
                     Description:
                  </Typography>
                  <Typography sx={{ m: 'auto', mt: 3, fontFamily: 'Montserrat', fontWeight: 300, width: '80%', fontStyle: 'italic', marginBottom: '30px',textAlign: 'justify', }}>
                    {Book.description ? Book.description : "aucune description"}
                  </Typography>
               
                </Box>

         
        </Box>
    </div>
  )
}

export default BoxBook