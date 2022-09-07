import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogUser: false,
  token: "",
  id: "",
  firstname: "",
  lastname: "",
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.isLogUser = true
      state.token = action.payload  
    },
    //******* */ modif ML ***************
    userId: (state, action) => {
      state.id = action.payload
    },
    userFirstname: (state, action) => {
      state.firstname = action.payload
    },
    userLastname: (state, action) => {
      state.lastname = action.payload
    },
    userLogout: (state) => {
      state.isLogUser = false
      state.token= ""
      state.firstname= ""
      state.lastname= ""
    },
  }
})

export const { userLogin, userId, userFirstname, userLastname, userLogout } = userSlice.actions

export default userSlice.reducer