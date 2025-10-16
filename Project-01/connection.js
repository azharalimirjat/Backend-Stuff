const mongoose = require('mongoose');

// Connecting to Mongoose
async function connectMongoDB(url) {
    return mongoose.connect(url);
}

module.exports = 
    {
        connectMongoDB,
    };