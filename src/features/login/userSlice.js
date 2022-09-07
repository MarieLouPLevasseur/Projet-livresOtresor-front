import { createSlice } from '@reduxjs/toolkit'

 
const initialState = {
  isLogUser: false,
  token: "",
  userId: "",
  firstname: "",
  lastname: "",
  kidId: "",
  kidAvatar: "",
  kidUsername: "",
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
      state.userId = action.payload
    },
    userFirstname: (state, action) => {
      state.firstname = action.payload
    },
    userLastname: (state, action) => {
      state.lastname = action.payload
    },
    userKidId: (state, action) => {
      state.kidId = action.payload
    },
    userKidAvatar: (state, action) => {
      state.kidAvatar = action.payload
    },
    userKidUsername: (state, action) => {
      state.kidUsername = action.payload
    },
    userLogout: (state) => {
      state.isLogUser = false
      state.token= ""
      state.userId= ""
      state.firstname= ""
      state.lastname= ""
      state.kidId= ""
      state.kidAvatar= ""
      state.kidUsername= ""
    },
  }
})

export const { userLogin, userId, userFirstname, userLastname, userLogout , userKidId, userKidAvatar , userKidUsername} = userSlice.actions

export default userSlice.reducer