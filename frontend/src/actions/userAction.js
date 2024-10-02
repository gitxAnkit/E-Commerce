
import axios from "axios";
import {
    loginRequest,
    loginSuccess,
    loginFail,
    registerUserRequest,
    registerUserSuccess,
    registerUserFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logoutSuccess,
    logoutFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    updateProfileReset,
    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFail,
    updatePasswordReset,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail,
    allUsersRequest,
    allUsersSuccess,
    allUsersFail,
    userDetailsRequest,
    userDetailsSuccess,
    userDetailsFail,
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFail,
    deleteUserReset,
    updateUserRequest,
    updateUserSuccess,
    updateUserFail,
    updateUserReset,
    clearErrors,
} from '../redux/slices/userSlice';

const linkPrefix = `http://localhost:4000`;
// Login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(loginRequest());

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(
            `${linkPrefix}/api/v1/login`,
            { email, password },
            config
        );

        dispatch(loginSuccess(data.user));
    } catch (error) {
        dispatch(loginFail(error.response.data.message));
    }
};

// Register
export const register = (userData) => async (dispatch) => {
    try {
        dispatch(registerUserRequest());

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.post(`${linkPrefix}/api/v1/register`, userData, config);

        dispatch(registerUserSuccess(data.user));
    } catch (error) {
        dispatch(registerUserFail(error.response.data.message));
    }
};

// Load User
export const loadUser = () => async (dispatch) => {
    try {
        dispatch(loadUserRequest());

        const { data } = await axios.get(`${linkPrefix}/api/v1/me`);

        dispatch(loadUserSuccess(data.user));
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message));
    }
};

// Logout User
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`${linkPrefix}/api/v1/logout`);

        dispatch(logoutSuccess());
    } catch (error) {
        dispatch(logoutFail(error.response.data.message));
    }
};

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch(updateProfileRequest());

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.put(`${linkPrefix}/api/v1/me/update`, userData, config);

        dispatch(updateProfileSuccess(data.success));
    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message));
    }
};

// Update Password
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch(updatePasswordRequest());

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(
            `${linkPrefix}/api/v1/password/update`,
            passwords,
            config
        );

        dispatch(updatePasswordSuccess(data.success));
    } catch (error) {
        dispatch(updatePasswordFail(error.response.data.message));
    }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch(forgotPasswordRequest());

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(`${linkPrefix}/api/v1/password/forgot`, email, config);

        dispatch(forgotPasswordSuccess(data.message));
    } catch (error) {
        dispatch(forgotPasswordFail(error.response.data.message));
    }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch(resetPasswordRequest());

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(
            `${linkPrefix}/api/v1/password/reset/${token}`,
            passwords,
            config
        );

        dispatch(resetPasswordSuccess(data.success));
    } catch (error) {
        dispatch(resetPasswordFail(error.response.data.message));
    }
};

// get All Users
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch(allUsersRequest());
        const { data } = await axios.get(`${linkPrefix}/api/v1/admin/users`);

        dispatch(allUsersSuccess(data.users));
    } catch (error) {
        dispatch(allUsersFail(error.response.data.message));
    }
};

// get  User Details
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch(userDetailsRequest());
        const { data } = await axios.get(`${linkPrefix}/api/v1/admin/user/${id}`);

        dispatch(userDetailsSuccess(data.user));
    } catch (error) {
        dispatch(userDetailsFail(error.response.data.message));
    }
};

// Update User
export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch(updateUserRequest());

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(
            `${linkPrefix}/api/v1/admin/user/${id}`,
            userData,
            config
        );

        dispatch(updateUserSuccess(data.success));
    } catch (error) {
        dispatch(updateUserFail(error.response.data.message));
    }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch(deleteUserRequest());

        const { data } = await axios.delete(`${linkPrefix}/api/v1/admin/user/${id}`);

        dispatch(deleteUserSuccess(data));
    } catch (error) {
        dispatch(deleteUserFail(error.response.data.message));
    }
};

// Clearing Errors
export const clearUserErrors = () => async (dispatch) => {
    dispatch(clearErrors());
};