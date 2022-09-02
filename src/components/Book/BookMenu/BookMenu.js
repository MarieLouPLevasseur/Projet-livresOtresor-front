import * as React from 'react';
import { Button } from '@mui/material'
import Box from '@mui/material/Box';
import { NavLink } from "react-router-dom";

import './BookMenu.scss'

function BookMenu() {
  return (
    <Box sx={{ flexGrow: 1, display:'flex', flexDirection: 'column', maxWidth : '200px', display:{ xs: 'none', sm: 'block' }, marginLeft:'-300px'}}>
      {/* injection d'une Box pour responsive */}
      <Box display={'flex'} >
          <Button
            className='button'
            sx={{ my: 2, color: 'red',fontFamily:'Montserrat', display: 'block', ml: 5, minWidth:'200px'}}
          >
            <NavLink
              className={({ isActive }) => (isActive ? 'button button--active' : 'button')}
              style={{ textDecoration: 'none'}}
              to='/profil/enfant'
            >
              Accueil
            </NavLink>
          </Button>
          <Button
            className='button'
            sx={{ my: 2, color: 'red',fontFamily:'Montserrat', display: 'block', ml: 5, minWidth:'200px' }}
          >
            <NavLink
              className={({ isActive }) => (isActive ? 'button button--active' : 'button')}
              style={{ textDecoration: 'none'}}
              to='/mes-livres'
            >
              Mes livres
            </NavLink>
          </Button>
      </Box>
      <Box sx={{mt:'-12px'}} display={'flex'}>
          <Button
            className='button'
            sx={{ my: 2, color: 'red',fontFamily:'Montserrat', display: 'block', ml: 5, minWidth:'200px'}}
          >
            <NavLink
              className={({ isActive }) => (isActive ? 'button button--active' : 'button')}
              style={{ textDecoration: 'none'}}
              to='/recompenses'
            >
              Mes récompenses
            </NavLink>
          </Button>
          <Button
            className='button'
            sx={{ my: 2, color: 'red',fontFamily:'Montserrat', display: 'block', ml: 5, minWidth:'200px'}}
          >
            <NavLink
              className={({ isActive }) => (isActive ? 'button button--active' : 'button')}
              style={{ textDecoration: 'none'}}
              to='/recherche'
            >
              Recherche de livres
            </NavLink>
          </Button>
      </Box>
    </Box>
  );
}

export default BookMenu