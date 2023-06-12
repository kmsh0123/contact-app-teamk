import { configureStore } from '@reduxjs/toolkit'
import { contactApi } from './Api/contactApi'
import authSlice from './service/authSlice'
import { contactListApi } from './Api/contactListApi'
import contactSlice from './service/contactSlice'
import navbarSlice from './service/navbarSlice'
import darkModeSlice from './service/darkModeSlice'

export const store = configureStore({
    reducer: {
        [contactApi.reducerPath]: contactApi.reducer,
        [contactListApi.reducerPath]: contactListApi.reducer,

        authSlice: authSlice,
        contactSlice: contactSlice,
        navbar: navbarSlice,
        darkMode:darkModeSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(contactApi.middleware, contactListApi.middleware),
})