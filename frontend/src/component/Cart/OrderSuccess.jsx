import React from "react";
import { CheckCircle } from "@mui/icons-material";
import { Typography, Link } from "@mui/material";
import "./orderSuccess.css";
import { Link as RouterLink } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircle sx={{ fontSize: 50, color: "green" }} />
      <Typography variant="h4">
        Your Order has been placed successfully
      </Typography>
      <Link component={RouterLink} to="/orders" variant="body1">
        View Orders
      </Link>
    </div>
  );
};

export default OrderSuccess;
