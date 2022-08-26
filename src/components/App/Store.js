import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../../features/login/userSlice'
import kidReducer from '../../features/login/kidSlice' 

export const store = configureStore({
  reducer: {
    user: userReducer,
    kid: kidReducer,
  },
})