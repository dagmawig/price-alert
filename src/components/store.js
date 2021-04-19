import { configureStore } from '@reduxjs/toolkit';
import priceReducer from './priceSlice';

export default configureStore({
    reducer: {
        price: priceReducer,
    },
});