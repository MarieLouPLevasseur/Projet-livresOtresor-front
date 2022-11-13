import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isbn: 0,
  cover: "",
  title: "",
  description: "",
  authors: [],
  publisher: "",
}

export const searchBookSlice = createSlice({
  name: 'searchBook',
  initialState,
  reducers: {
    searchBookIsbn: (state, action) => {
    
      state.isbn = action.payload
    },
    searchBookCover: (state, action) => {
      state.cover = action.payload
    },
    searchBookTitle: (state, action) => {
      state.title = action.payload
    },
    searchBookDescription: (state, action) => {
      state.description = action.payload
    },
    searchBookAuthors: (state, action) => {
      state.authors = action.payload
    },
    searchBookPublisher: (state, action) => {
      state.publisher = action.payload
    },
   
  }
})

export const { searchBookIsbn, searchBookCover, searchBookTitle, searchBookDescription, searchBookAuthors, searchBookPublisher } = searchBookSlice.actions

export default searchBookSlice.reducer