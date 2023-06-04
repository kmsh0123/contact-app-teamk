import { configureStore } from '@reduxjs/toolkit'
import { contactApi } from './Api/contactApi'
import authSlice from './services/authSlice'

export const store = configureStore({
    reducer: {
        [contactApi.reducerPath]: contactApi.reducer,
        authSlice: authSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(contactApi.middleware),
})