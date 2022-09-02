import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogUser: false,
  token: "",
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
    },
  }
})

export const { userLogin, userLogout } = userSlice.actions

export default userSlice.reducer