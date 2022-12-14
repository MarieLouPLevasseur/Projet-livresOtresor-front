import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../../features/login/userSlice'
import kidReducer from '../../features/login/kidSlice' 
import apiReducer from '../../features/api/apiSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    kid: kidReducer,
    api: apiReducer,
  },
})