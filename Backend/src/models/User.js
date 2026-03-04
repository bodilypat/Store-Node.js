//models/User.js 

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true,
        trim: true,
        unique: true 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    passwordHash: { 
        type: String, 
        type: String,
        required: true 
    },
    role: { 
        type: String, 
        enum: ['admin', 'cashier'], 
        default: 'cashier'
    },
    phoneNumber: String
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

