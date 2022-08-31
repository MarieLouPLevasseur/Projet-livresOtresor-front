import React from 'react'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
// import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility';


function ButtonList() {
  return (
    <div>
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab color="primary" aria-label="add">
        <VisibilityIcon />
      </Fab>
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