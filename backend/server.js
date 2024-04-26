const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/connection');

// config
dotenv.config({ path: "backend/config/config.env" });

// connection
connectDB();


app.listen(process.env.PORT, () => {
    console.log(`Server started at PORT:${process.env.PORT}`)
})