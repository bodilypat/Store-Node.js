//src/models/Product.js 

/* 
// Products Collection
{
    "_id": ObjectId("..."),
    "productName": "",
    "categoryId": "",
    "barcode": "",
    "purchasePrice": 0.00,
    "sellingPrice": 0.00,
    "stockQuantity": 0,
    "description": "",
    "created_at": ISODate("")
} */

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    barcode: {
        type: String,
        unique: true,
        sparse: true
    },
    purchasePrice: {
        type: Number,
        required: true,
        min: 0
    },
    sellingPrice: {
        type: Number,
        required: true,
        min: 0
    },
    stockQuantity: {
        type: Number,
        required: true,
        min: 0
    },
    description: String
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
