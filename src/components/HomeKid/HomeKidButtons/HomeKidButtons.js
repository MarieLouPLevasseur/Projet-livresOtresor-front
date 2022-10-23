import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { NavLink } from "react-router-dom";

import './HomeKidButtons.scss'

export default function HomeKidButtons() {
  return (
    // display:{ xs: 'none', sm: 'block' }
    <Box sx={{ flexGrow: 1, display:{xs:'none',sm:'flex'}, flexDirection: 'column', maxWidth : '15%', }}>
      <Button
        className='button'
        sx={{ my: 2, color: 'red',fontFamily:'Montserrat', display: 'block', ml: 5, overflow:'hidden', fontSize:{l:12}}}
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
        sx={{ my: 2, color: 'red',fontFamily:'Montserrat', display: 'block', ml: 5 , overflow:'hidden', fontSize:{l:12}}}
      >
        <NavLink
          className={({ isActive }) => (isActive ? 'button button--active' : 'button')}
          style={{ textDecoration: 'none'}}
          to='/mes-livres'
        >
          Mes livres
        </NavLink>
      </Button>
      <Button
        className='button'
        sx={{ my: 2, color: 'red',fontFamily:'Montserrat', display: 'block', ml: 5, overflow:'hidden', fontSize:{l:12}}}
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
        sx={{ my: 2, color: 'red',fontFamily:'Montserrat', display: 'block', ml: 5, overflow:'hidden', fontSize:{l:12}}}
        
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
  );
}