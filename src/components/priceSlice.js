import { createSlice } from '@reduxjs/toolkit';

export const priceSlice = createSlice({
    name: 'price',
    initialState: {
        loading: false,
        userData: {
            userID: '',
            pic: '',
            name: '',
            itemNameArr: [],
            originalPArr: [],
            targetPArr: [],
            currentPArr: [],
            timeStampArr: [],
            urlArr: [],
        },
    },
    reducers: {
        setUserID: (state, action) => {
            state.userData.userID = action.payload;
        },
        addUrl: (state, action) => {
            state.itemUrl.push(action.payload);
        },
        addPendingUrl: (state, action) => {
            state.pendingUrl = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        updateUserData: (state, action) => {
            state.userData = action.payload;
        }
    },
});


// action creators generated for each case reducer function.
export const { setUserID, addUrl, addPendingUrl, updateUserData, setLoading } = priceSlice.actions;

export default priceSlice.reducer;