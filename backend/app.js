const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error");
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
// Route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoutes");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);



// Middleware for error
app.use(errorMiddleware);


module.exports = app;