//src/models/Suppler.js 

/* 
// suppiers Collection
{
    "_id": ObjectId("..."),
    "supplierName": "",
    "contactName": "",
    "contactEmail": "",
    "contactPhone": "",
    "created_at": ISODate("")
} */

const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    supplierName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    contactName: String,
    contactEmail: String,
    contactPhone: String
}, { timestamps: true });

module.exports = mongoose.model('Supplier', supplierSchema);
