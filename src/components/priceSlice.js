import { createSlice } from '@reduxjs/toolkit';

export const priceSlice = createSlice({
    name: 'pricee',
    initialState: {
        itemUrl: ['empty'],
    },
    reducers: {
        addUrl: (state, action) => {
            state.itemUrl = [ ...state.itemUrl, action.payload ];
        },
    },
});


// action creators generated for each case reducer function.
export const { addUrl } = priceSlice.actions;

export default priceSlice.reducer;