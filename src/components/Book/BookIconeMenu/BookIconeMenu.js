import React from 'react'
import { Button, Box } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
          <Box sx={{ display: { xs: 'block', sm: 'none' }, position: 'fixed', alignSelf: 'start', top:'30vh' , left: '20px', flexDirection:'column'}}>
              <Box sx={{display:'flex', flexDirection:'column'}} >
                  <Button>
                    <HomeIcon sx={{fontSize:'50px'}} />
                  </Button>
                  <Button>
                    <MenuBookIcon sx={{fontSize:'50px'}} />
                  </Button>
                  <Button>
                    <EmojiEventsIcon sx={{fontSize:'50px'}} />
                  </Button>
                  <Button>
                  <SearchIcon sx={{fontSize:'50px'}} />
                  </Button>
              </Box>
          </Box>
        </div>
    </ThemeProvider>
  )
}

export default BookIconeMenu