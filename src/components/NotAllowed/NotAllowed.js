import { Box, Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import NotAllowedCover from '../../assets/img/notAllowed.png'

import './NotAllowed.scss'

const theme = createTheme({
  palette:{
    primary:{
      main: '#4462A5',
    }
  },
});

function NotAllowed() {
  return (
    <div className='container'>
      <ThemeProvider theme={theme}>
        <Box sx={{display:'flex', flexDirection: 'column', width: '60%', alignItems: 'center', mt: 1,ml:'auto', mr:'auto'}}>
          <img src={NotAllowedCover} alt="page erreur"></img>
          <Link to='/' style={{ textDecoration: 'none'}}>
            <Button
              className="searchButton"
              type="submit"
              variant="contained"
              sx={{ width: '100%', mt: 1, mb: 1 }}
            >
              Retour à l'accueil
            </Button>
          </Link>
        </Box>
      </ThemeProvider>
    </div>
  )
}

export default NotAllowed