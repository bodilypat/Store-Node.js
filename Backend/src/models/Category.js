//src/models/Category.js 
/* 
// Categories Collection


{
    "_id": ObjectId("..."),
    "categoryName": "",
    "description": "",
    "created_at": ISODate("")
}

*/

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName: { 
        type: String, 
        required: true,
        trim: true,
        unique: true 
    },
    description: String
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);


