import React, { useEffect }from 'react'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
// import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility';

import { useDispatch } from 'react-redux';

import { userKidId, userKidUsername, userKidAvatar } from "../../../features/login/userSlice"
import {  Link } from 'react-router-dom';


function ButtonList( {kidId, username, avatar}){
  const dispatch = useDispatch();

  function handleDispatchInfoKid(){

    localStorage.setItem('userKids', JSON.stringify({
      kidId,
      username,
      avatar
    }));

    dispatch(userKidId(kidId));
    dispatch(userKidUsername(username));
    dispatch(userKidAvatar(avatar));
        
};
  return (

    
    <div>
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Link to = "/profil/enfant">
        <Fab color="primary" aria-label="add"
        
        onClick={ handleDispatchInfoKid }
        >
      

          <VisibilityIcon />
        </Fab>
      </Link>
      <Fab color="secondary" aria-label="edit">
        <EditIcon />
      </Fab>
      <Fab>
        <DeleteIcon />
      </Fab>
    </Box>
    </div>
  )
}

export default ButtonList