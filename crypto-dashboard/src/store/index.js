import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from './cryptoSlice.js';

const store = configureStore({
    reducer: {
        // Add your reducers here
        crypto: cryptoReducer,
    },
})

export default store;