import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  apiUrl: 'http://aswan-joseph-mathieu.vpnuser.lan:8000',
}

export const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    apiUrl: (state) => {
      return state.apiUrl
    }
  }
})

export const { apiUrl } = apiSlice.actions

export default apiSlice.reducer