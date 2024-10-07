import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WebFont from "webfontloader";
import axios from "axios";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ErrorBoundary from "./ErrorBoundary";
import { HelmetProvider } from "react-helmet-async";
import ProductDetails from "./component/Product/ProductDetails.jsx";
import "./App.css";
import Products from "./component/Product/Products.jsx";
import Search from "./component/Product/Search.jsx";
import LoginSignUp from "./component/User/LoginSignUp.jsx";
import UserOptions from "./component/layout/Header/UserOptions.jsx";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./component/User/Profile.jsx";
import ProtectedRoute from "./component/Route/ProtectedRoute.jsx";
import {
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
} from "./redux/slices/userSlice.js";
import UpdateProfile from "./component/User/UpdateProfile.jsx";
import UpdatePassword from "./component/User/UpdatePassword.jsx";
import ForgotPassword from "./component/User/ForgotPassword.jsx";
import ResetPassword from "./component/User/ResetPassword.jsx";

const linkPrefix = `http://localhost:4000`;

// Configure axios defaults
axios.defaults.withCredentials = true; // Added to handle cookies
axios.defaults.baseURL = linkPrefix;

const App = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      try {
        dispatch(loadUserRequest());
        const { data } = await axios.get("/api/v1/me");
        dispatch(loadUserSuccess(data.user));
      } catch (error) {
        dispatch(
          loadUserFail(error.response?.data?.message || "Failed to load user")
        );
      }
    };

    loadUser();
  }, [dispatch]);

  return (
    <HelmetProvider>
      <Router>
        <ErrorBoundary>
          <Header />
          {isAuthenticated && <UserOptions user={user} />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:keyword" element={<Products />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<LoginSignUp />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/account" element={<Profile />} />
              <Route path="/me/update" element={<UpdateProfile />} />
              <Route path="/password/update" element={<UpdatePassword />} />
            </Route>
          </Routes>
          <Footer />
        </ErrorBoundary>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={true}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </HelmetProvider>
  );
};

export default App;
