import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ isAdmin = false }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const location = useLocation();

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (isAdmin && (!user?.role || user.role !== "admin")) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
          error: "Admin access required",
        }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
