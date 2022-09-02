import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogKid: false,
  token: "",
  id: "",
  username: "",
  avatar: "",
}

export const kidSlice = createSlice({
  name: 'kid',
  initialState,
  reducers: {
    kidLogin: (state, action) => {
      state.isLogKid = true
      state.token = action.payload
    },
    kidId: (state, action) => {
      state.id = action.payload
    },
    kidUsername: (state, action) => {
      state.username = action.payload
    },
    kidAvatar: (state, action) => {
      state.avatar = action.payload
    },
    kidLogout: (state) => {
      state.isLogKid = false
      state.token = ""
      state.id = ""
      state.username = ""
      state.avatar = ""
    },
  }
})

export const { kidLogin, kidLogout, kidId, kidUsername, kidAvatar } = kidSlice.actions

export default kidSlice.reducer