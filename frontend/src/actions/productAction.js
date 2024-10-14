import axios from "axios";

import {
    productsRequest,
    allProductsSuccess,
    adminProductsSuccess,
    productsFail,
    productOperationRequest,
    deleteProductSuccess,
    updateProductSuccess,
    productOperationFail,
    resetDeleteProduct,
    resetUpdateProduct,
    clearErrors as clearProductErrors,
} from '../redux/slices/product/productsSlice';

import {
    deleteReviewRequest,
    deleteReviewSuccess,
    deleteReviewFail,
    resetDeleteReview,
    clearErrors as clearReviewErrors,
} from '../redux/slices/product/reviewSlice';

import {
    allReviewRequest,
    allReviewSuccess,
    allReviewFail,
    clearErrors as clearProductReviewErrors,
} from '../redux/slices/product/productReviewSlice';

import {
    newReviewRequest,
    newReviewSuccess,
    newReviewFail,
    resetNewReview,
    clearErrors as clearNewReviewErrors,
} from '../redux/slices/product/newReviewSlice';

import {
    newProductRequest,
    newProductSuccess,
    newProductFail,
    resetNewProduct,
    clearErrors as clearNewProductErrors,
} from '../redux/slices/product/newProductSlice';

import {
    productDetailsRequest,
    productDetailsSuccess,
    productDetailsFail,
    clearErrors as clearProductDetailsErrors,
} from '../redux/slices/product/productDetailsSlice';


axios.defaults.withCredentials = true;

const linkPrefix = `http://localhost:4000`;
// Get All Products
export const getProduct = (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) => async (dispatch) => {
    try {
        dispatch(productsRequest());

        let link = `${linkPrefix}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        // let link = `${linkPrefix}/api/v1/products`;
        if (category) {
            link = `${linkPrefix}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }

        const { data } = await axios.get(link);

        dispatch(allProductsSuccess(data));
    } catch (error) {
        dispatch(productsFail(error.response.data.message));
    }
};

// Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {
    try {
        dispatch(productsRequest());

        const { data } = await axios.get(`${linkPrefix}/api/v1/admin/products`);

        dispatch(adminProductsSuccess(data.products));
    } catch (error) {
        dispatch(productsFail(error.response.data.message));
    }
};

// Create Product
export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch(newProductRequest());

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.post(`${linkPrefix}/api/v1/admin/product/new`, productData, config);

        dispatch(newProductSuccess(data));
    } catch (error) {
        dispatch(newProductFail(error.response.data.message));
    }
};

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch(productOperationRequest());

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.put(`${linkPrefix}/api/v1/admin/product/${id}`, productData, config);

        dispatch(updateProductSuccess(data.success));
    } catch (error) {
        dispatch(productOperationFail(error.response.data.message));
    }
};

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch(productOperationRequest());

        const { data } = await axios.delete(`${linkPrefix}/api/v1/admin/product/${id}`);

        dispatch(deleteProductSuccess(data.success));
    } catch (error) {
        dispatch(productOperationFail(error.response.data.message));
    }
};

// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch(productDetailsRequest());
        const { data } = await axios.get(`${linkPrefix}/api/v1/product/${id}`);
        dispatch(productDetailsSuccess(data.product));
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message; // Fallback for network errors or undefined response
        dispatch(productDetailsFail(message));
    }
};


// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch(newReviewRequest());

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.put(`${linkPrefix}/api/v1/review`, reviewData, config);

        dispatch(newReviewSuccess(data.success));
    } catch (error) {
        dispatch(newReviewFail(error.response.data.message));
    }
};

// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
    try {
        dispatch(allReviewRequest());

        const { data } = await axios.get(`${linkPrefix}/api/v1/reviews?id=${id}`);

        dispatch(allReviewSuccess(data.reviews));
    } catch (error) {
        dispatch(allReviewFail(error.response.data.message));
    }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
    try {
        dispatch(deleteReviewRequest());

        const { data } = await axios.delete(`${linkPrefix}/api/v1/reviews?id=${reviewId}&productId=${productId}`);

        dispatch(deleteReviewSuccess(data.success));
    } catch (error) {
        dispatch(deleteReviewFail(error.response.data.message));
    }
};

// Clearing Errors
export const clearErrors = () => (dispatch) => {
    dispatch(clearProductErrors());
    dispatch(clearReviewErrors());
    dispatch(clearProductReviewErrors());
    dispatch(clearNewReviewErrors());
    dispatch(clearNewProductErrors());
    dispatch(clearProductDetailsErrors());
};
