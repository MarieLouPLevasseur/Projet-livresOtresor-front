import React, { useState } from 'react'
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function MyBooksSelect() {
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [collection, setCollection] = useState("");

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeAuthor = (event) => {
    setAuthor(event.target.value);
  };

  const handleChangeCollection = (event) => {
    setCollection(event.target.value);
  };
  return (
    <Box sx={{ display: "flex", width: "100%", justifyContent: 'center', mb: 3}}>
      <FormControl sx={{ width: '20%' }}>
        <InputLabel id="demo-simple-select-category">Catégorie</InputLabel>
        <Select
          sx={{ width: "80%" }}
          labelId="demo-simple-select-category"
          id="demo-simple-category"
          value={category}
          label="category"
          onChange={handleChangeCategory}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ width: '20%'}}>
        <InputLabel id="demo-simple-select-category">Auteur</InputLabel>
        <Select
          sx={{ width: "80%" }}
          labelId="demo-simple-select-category"
          id="demo-simple-category"
          value={author}
          label="category"
          onChange={handleChangeAuthor}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ width: '20%'}}>
        <InputLabel id="demo-simple-select-category">Collection</InputLabel>
        <Select
          sx={{ width: "80%" }}
          labelId="demo-simple-select-collection"
          id="demo-simple-collection"
          value={collection}
          label="collection"
          onChange={handleChangeCollection}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
