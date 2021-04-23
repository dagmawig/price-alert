import { createSlice } from '@reduxjs/toolkit';

export const priceSlice = createSlice({
    name: 'pricee',
    initialState: {
        itemUrl: ['empty'],
        pendingUrl: ''
    },
    reducers: {
        addUrl: (state, action) => {
            state.itemUrl.push(action.payload);
        },
        addPendingUrl: (state, action) => {
            state.pendingUrl = action.payload;
        }
    },
});


// action creators generated for each case reducer function.
export const { addUrl, addPendingUrl } = priceSlice.actions;

export default priceSlice.reducer;