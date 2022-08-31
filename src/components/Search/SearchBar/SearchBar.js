import React from 'react'
import { Box, TextField, Button } from '@mui/material'

import './SearchBar.scss'

function SearchBar({ search, setSearch, setItemToSearch }) {
  return (
    <Box
    component="form"
    onSubmit={(e) => {
      e.preventDefault()
      setItemToSearch(search)
      setSearch('')
    }}
    sx={{
      mt: 2,
      mb: 5,
      display: 'flex',
      width: '70%',
      justifyContent: 'center'
    }}
    autoComplete="off"
    >
    <TextField 
      value={search}
      onChange={(event) => {
        setSearch(event.target.value);
      }}
      id="outlined-basic" 
      label="Recherche..." 
      variant="outlined"
      sx={{ width: '70%', mr: 0.5 }}
    />
    <Button
      className="searchButton"
      type="submit"
      variant="contained"
      sx={{ width: '15%' }}
    >
      C'est parti !
    </Button>
    </Box>
  )
}
    
    export default SearchBar