import React from 'react'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import EditIcon from '@mui/icons-material/Edit'


function Account() {
  return (
    <div>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab color="secondary" aria-label="edit">
        <EditIcon />
      </Fab>
    </Box>

    </div>
  )
}

export default Account