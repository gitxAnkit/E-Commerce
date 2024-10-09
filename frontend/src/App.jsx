import React, { useEffect, useState } from "react";
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
import { loadUser } from "./actions/userAction.js";
import UpdateProfile from "./component/User/UpdateProfile.jsx";
import UpdatePassword from "./component/User/UpdatePassword.jsx";
import ForgotPassword from "./component/User/ForgotPassword.jsx";
import ResetPassword from "./component/User/ResetPassword.jsx";
import Cart from "./component/Cart/Cart.jsx";
import Shipping from "./component/Cart/Shipping.jsx";
import ConfirmOrder from "./component/Cart/ConfirmOrder.jsx";
import Payment from "./component/Cart/Payment.jsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import store from "./redux/store.js";
import OrderSuccess from "./component/Cart/OrderSuccess.jsx";
import MyOrders from "./component/Order/MyOrders.jsx";

const linkPrefix = `http://localhost:4000`;

// Configure axios defaults
axios.defaults.withCredentials = true; // Added to handle cookies
axios.defaults.baseURL = linkPrefix;

const App = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [stripeApiKey, setStripeApiKey] = useState("");

  const getStripeApiKey = async () => {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  };

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    dispatch(loadUser());
    getStripeApiKey();
  }, [dispatch]);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

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
              <Route path="/cart" element={<Cart />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/order/confirm" element={<ConfirmOrder />} />
              <Route path="/success" element={<OrderSuccess />} />
              <Route path="/orders" element={<MyOrders />} />
            </Route>
          </Routes>
          {/* Move Elements wrapping here */}
          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Routes>
                <Route path="/process/payment" element={<Payment />} />
              </Routes>
            </Elements>
          )}
          <Footer />
        </ErrorBoundary>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar
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
