import React from 'react'
import { Box, TextField, Button } from '@mui/material'

import './SearchBar.scss'
import { AirlineSeatLegroomExtraOutlined, Padding } from '@mui/icons-material'

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
      width: {sm:'70%', md:'40%'},
      paddingLeft: {xs:'5em', sm:'8em'},
      flexDirection:{xs:'column', md: 'row'},
      alignItems:'center',
      margin: {md:'auto'},
      marginRight: { xs: '17%', sm:'20%' }
      
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
        sx={{
          width: {xs: '50%' ,md:'20%'} ,
          margin: {xs:'15px', md:'auto'},
        }}
      >
        C'est parti !
      </Button>
    </Box>
  )
}
    
    export default SearchBar