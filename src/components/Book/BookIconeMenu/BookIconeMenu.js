import React from 'react'
import { Button, Box } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink } from "react-router-dom";
// import './BookIconeMenu.scss'
import Tooltip from '@mui/material/Tooltip';


const theme = createTheme({
  palette:{
    primary:{
      main: '#4462A5',
    }
  },
});

function BookIconeMenu() {
  return (
    <ThemeProvider theme={theme}>
        <div>
          {/* <Box sx={{ display: { xs: 'block', sm: 'none' }, position: 'fixed', alignSelf: 'start', top:'30vh' , left: '20px', flexDirection:'column'}}> */}
          <Box sx={{ visibility: { xs: 'visible', sm: 'hidden' }, position: 'fixed', alignSelf: 'start', top:'30vh' , left: '20px', flexDirection:'column'}}>
              <Box sx={{display:'flex', flexDirection:'column'}} >
              <Tooltip title="Accueil">

                  <Button className='button-home' alt='home navigation'>
                  <NavLink
                    className={({ isActive }) => (isActive ? 'button button--active' : 'button')}
                    style={{ textDecoration: 'none'}}
                    to='/'
                  >   
          
                    <HomeIcon sx={{fontSize:'50px'}} 
                    />
                  </NavLink>
                  </Button>
                  </Tooltip>

                  <Tooltip title="Consulter mes livres">
                  <Button className='button-book' alt='My book navigation'>
                  <NavLink
                    className={({ isActive }) => (isActive ? 'button button--active' : 'button')}
                    style={{ textDecoration: 'none'}}
                    to='/mes-livres'
                    > 
                    <MenuBookIcon sx={{fontSize:'50px'}} />
                  </NavLink>
                  </Button>
                    </Tooltip>
                    <Tooltip title="Consulter mes Récompenses">

                  <Button className='button-rewards' alt='my reward navigation'>

                  <NavLink
                    className={({ isActive }) => (isActive ? 'button button--active' : 'button')}
                    style={{ textDecoration: 'none'}}
                    to='/recompenses'
                  > 
                    <EmojiEventsIcon sx={{fontSize:'50px'}} />
                  </NavLink>

                  </Button>
                  </Tooltip>

                  {/* <Button>
                  <SearchIcon sx={{fontSize:'50px'}} />
                  </Button> */}
                  <Tooltip title="Chercher un livre">

                  <Button className='button-search' alt='search book navigation'>
                  <NavLink
                    className={({ isActive }) => (isActive ? 'button button--active' : 'button')}
                    style={{ textDecoration: 'none'}}
                    to='/recherche'
                  > 
                    <SearchIcon sx={{fontSize:'50px'}} />
                  </NavLink>
                  </Button>
                  </Tooltip>

              </Box>
          </Box>
        </div>
    </ThemeProvider>
  )
}

export default BookIconeMenu


