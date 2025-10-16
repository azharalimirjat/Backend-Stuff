const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

//Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    job_title: {
        type: String,
    },
    gender: {
        type: String,
    },
}, {timestamps: true});

// Model
const User = mongoose.model('user', userSchema);

module.exports = User;