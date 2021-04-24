import { createSlice } from '@reduxjs/toolkit';

export const priceSlice = createSlice({
    name: 'price',
    initialState: {
        itemUrl: ['empty'],
        pendingUrl: '',
        userData: '',
    },
    reducers: {
        addUrl: (state, action) => {
            state.itemUrl.push(action.payload);
        },
        addPendingUrl: (state, action) => {
            state.pendingUrl = action.payload;
        },
        updateUserData: (state, action) => {
            state.userData = action.payload;
        }
    },
});


// action creators generated for each case reducer function.
export const { addUrl, addPendingUrl, updateUserData } = priceSlice.actions;

export default priceSlice.reducer;