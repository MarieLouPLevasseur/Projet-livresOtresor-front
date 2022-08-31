import React from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette:{
    primary:{
      main: '#4462A5',
    }
  },
  typography: {
    fontFamily: [
      'Montserrat'
    ]
  }
});


function AccountM() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Box sx={{display:'flex', flexDirection:'column', gap:'15px'}}>
          <Button variant='contained'>
              <EditIcon />
          </Button>
          <Button variant='contained'>
              <DeleteIcon />
          </Button>
        </Box>
      </div>
    </ThemeProvider>
  )
}

export default AccountM