import React from 'react'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
// import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';


function Validate() {
  return (
    <div>
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab color='success'>
        <DoneOutlineIcon />
      </Fab>
    </Box>
    </div>
  )
}

export default Validate