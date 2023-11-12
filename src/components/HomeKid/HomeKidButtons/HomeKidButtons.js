import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { NavLink } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';

import './HomeKidButtons.scss'

export default function HomeKidButtons() {
  return (
    // display:{ xs: 'none', sm: 'block' }
    <Box sx={{ flexGrow: 1, display:{xs:'none',sm:'flex'}, flexDirection: 'column', width : '20%', maxWidth:'250px' }}>
      <Tooltip title="Accueil">

      <Button
     className='button button-home' alt='home navigation'
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
      </Tooltip>
      <Tooltip title="Consulter mes livres">

      <Button className='button button-book' alt='My book navigation'
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
      </Tooltip>
      <Tooltip title="Consulter mes Récompenses">

      <Button
            className='button button-rewards' alt='my reward navigation'
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
      </Tooltip>
      <Tooltip title="Chercher un livre">

      <Button
        className='button button-search' alt='search book navigation'
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
      </Tooltip>
    </Box>
  );
}