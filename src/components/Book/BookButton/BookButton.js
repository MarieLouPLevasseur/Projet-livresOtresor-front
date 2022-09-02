import React from 'react'
import { Box, Button } from '@mui/material'

function BookButton() {
  return (
    <div>
       <Box sx={{ flexGrow: 1, display:'flex', flexDirection: 'column', width:'100%'}}>
          <Button
            sx={{ my: 2, color: 'white', background:'#4462A5' , fontFamily:'Montserrat', width:'100%'}}
          >
                Ajouter à ma liste d'envie
          </Button>
          <Button
            sx={{ my: 2, color: 'white',fontFamily:'Montserrat', background:'#4462A5', width:'100%' }}
          >
                Ajouter à mes livres lus
          </Button>
        </Box>
    </div>
  )
}

export default BookButton