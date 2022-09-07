import { createSlice } from '@reduxjs/toolkit'

 // TODO modifier les constantes de stockage du User en créant les variables: kidId kidAvatar et kidUsername 
        // TODO ces variables ne seront pas stocker à la connexion mais sur la page Homage User lors du clique pour voir un compte enfant
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
    kidId: (state, action) => {
      state.lastname = action.payload
    },
    kidAvatar: (state, action) => {
      state.lastname = action.payload
    },
    kidUsername: (state, action) => {
      state.lastname = action.payload
    },
    userLogout: (state) => {
      state.isLogUser = false
      state.token= ""
      state.firstname= ""
      state.lastname= ""
      state.kidId= ""
      state.kidAvatar= ""
      state.kidUsername= ""
    },
  }
})

export const { userLogin, userId, userFirstname, userLastname, userLogout } = userSlice.actions

export default userSlice.reducer