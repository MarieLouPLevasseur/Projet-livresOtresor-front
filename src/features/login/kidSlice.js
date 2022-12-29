import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogKid: false,
  token: "",
  id: "",
  username: "",
  firstname:"",
  avatar: "",
  progress: [],
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
    kidFirstname: (state, action) => {
      state.firstname = action.payload
    },
    kidAvatar: (state, action) => {
      state.avatar = action.payload
    },
    kidProgress: (state, action) => {
      state.progress = action.payload
    },
    kidLogout: (state) => {
      state.isLogKid = false
      state.token = ""
      state.id = ""
      state.username = ""
      state.avatar = ""
      state.progress = []
      state.firstname= ""
    },
  }
})

export const { kidLogin, kidLogout, kidId, kidUsername, kidAvatar, kidProgress , kidFirstname } = kidSlice.actions

export default kidSlice.reducer