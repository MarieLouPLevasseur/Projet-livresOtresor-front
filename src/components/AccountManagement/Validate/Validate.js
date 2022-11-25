import React from 'react'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
// import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import {  useNavigate } from 'react-router-dom';



function Validate({ handleSubmit }) {

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/profil/utilisateur`; 
    navigate(path);
  }
  return (
    <div>
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
     
          <Fab color='success'  onClick={()=>{handleSubmit();}} >
          {/* <Fab color='success'  > */}
            <DoneOutlineIcon />
          </Fab>
      
    </Box>
    </div>
  )
}

export default Validate