import { configureStore } from '@reduxjs/toolkit';
import {
    productsSlice,
    reviewSlice,
    productReviewSlice,
    newReviewSlice,
    newProductSlice,
    productDetailsSlice,
} from './slices/product'; // Assuming the slices are in a subdirectory named "product"

import cartSlice from './slices';
import orderSlice from './slices';
import userSlice from './slices';

const preloadedState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {},
    },
};

const store = configureStore({
    reducer: {
        products: productsSlice.reducer,
        productReview: productReviewSlice.reducer,
        productDetails: productDetailsSlice.reducer,
        newReview: newReviewSlice.reducer,
        newProduct: newProductSlice.reducer,
        cart: cartSlice.reducer,
        order: orderSlice.reducer,
        user: userSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
});

export default store;