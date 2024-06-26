const express = require('express');
const app = express();

const errorMiddleware = require("./middlewares/error");

app.use(express.json());

// Route imports
const product = require("./routes/productRoute");


app.use("/api/v1", product);

// Middleware for error
app.use(errorMiddleware);


module.exports = app;