import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogUser: false,
  token: "",
  id: "", 
  firstname: "",
  lastname:"",
  userKids: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.isLogUser = true
      state.token = action.payload
    },
    userLogout: (state) => {
      state.isLogUser = false
      state.token= ""
      state.firstname= ""
      state.lastname=""
      state.id=""
    },
    userId: (state, action) => {
      state.id = action.payload
    },
    userFirstname: (state, action) => {
      state.firstname = action.payload
    },
    userLastname: (state, action) => {
      state.lastname = action.payload
    },
    userKids: (state, action) => {
      state.userKids = action.payload
    },
  }
})

export const { userLogin, userLogout, userId, userFirstname, userLastname, userKids } = userSlice.actions

export default userSlice.reducer