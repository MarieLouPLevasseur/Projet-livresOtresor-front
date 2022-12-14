import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // apiUrl: 'http://marie-lou-prince-levasseur.vpnuser.lan:8000',
  // apiUrl: 'http://localhost:8000',
  apiUrl: 'http://api.livresotresor.fr',
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