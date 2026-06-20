const mongoose = require('mongoose');
const dns = require('dns');

// Forces Node.js to use Google's DNS servers for SRV resolution
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = () => {
    mongoose
        .connect(process.env.DB_URI)
        .then((data) => {
            console.log(`MongoDB connected with server ${data.connection.host}`);
        });
};

module.exports = connectDB;
