import { configureStore } from '@reduxjs/toolkit'
import { contactApi } from './Api/contactApi'
import authSlice from './service/authSlice'
import { contactListApi } from './Api/contactListApi'
import contactSlice from './service/contactSlice'

export const store = configureStore({
    reducer: {
        [contactApi.reducerPath]: contactApi.reducer,
        [contactListApi.reducerPath]: contactListApi.reducer,

        authSlice: authSlice,
        contactSlice: contactSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(contactApi.middleware, contactListApi.middleware),
})