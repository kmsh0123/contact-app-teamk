import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    contacts: [],
    searched: '',
    favourite: [],
};

export const contactSlice = createSlice({
    name: 'contactSlice',
    initialState,
    reducers: {
        addContacts: (state, { payload }) => {
            state.contacts = payload;
        },
        setSearched: (state, { payload }) => {
            state.searched = payload;
        },
        addFavourite: (state, { payload })=>{
            const isExisted=state.favourite.find(item=>item.id===payload.id);
            if(isExisted){
                return state;
            }else{
                state.favourite = [...state.favourite,payload];
            }
        },
        removeFavourite: (state,{payload})=>{
            state.favourite=state.favourite.filter((item)=>item.id!==payload.id)
        }
    }
})

export const { addContacts, setSearched, addFavourite, removeFavourite } = contactSlice.actions;
export default contactSlice.reducer;
