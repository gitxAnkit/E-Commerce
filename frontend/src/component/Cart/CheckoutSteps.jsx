import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step } from "@mui/material";
import {
  LocalShipping,
  LibraryAddCheck,
  AccountBalance,
} from "@mui/icons-material";
import "./CheckoutSteps.css";
import ErrorBoundary from "../../ErrorBoundary";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShipping />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheck />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalance />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <Fragment>
      <ErrorBoundary>
        <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
          {steps.map((item, index) => (
            <Step
              key={index}
              active={activeStep === index}
              completed={activeStep >= index}
            >
              <StepLabel
                style={{
                  color:
                    activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
                }}
                icon={item.icon}
              >
                {item.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </ErrorBoundary>
    </Fragment>
  );
};

export default CheckoutSteps;
