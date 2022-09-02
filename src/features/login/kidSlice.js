import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogKid: false,
  token: "",
}

export const kidSlice = createSlice({
  name: 'kid',
  initialState,
  reducers: {
    kidLogin: (state, action) => {
      state.isLogKid = true
      state.token = action.payload
    },
    kidLogout: (state) => {
      state.isLogKid = false
      state.token= ""
    },
  }
})

export const { kidLogin, kidLogout } = kidSlice.actions

export default kidSlice.reducer