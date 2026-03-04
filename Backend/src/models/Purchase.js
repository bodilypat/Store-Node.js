//src/models/Purchase.js 

/* 
// purchases Collection
{
    "_id": ObjectId("..."),
    "supplierId": ObjectId("..."), // Reference to Suppliers Collection
    "purchasesDate": ISODate(""),
    "totalAmount": 0.00,
    "item   s": [
        {
            "product_id": ObjectId("..."), // Reference to Products Collection
            "quantity": 0,
            "unitPrice": 0.00
        },
        {
            "product_id": ObjectId("..."), // Reference to Products Collection
            "quantity": 0,
            "unitPrice": 0.00
        }
    ]
}
 */

const mongoose = require('mongoose');

const purchaseItemSchema = new mongoose.Schema({
    supplierId: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    purchasesDate: {
        type: Date,
        default: Date.now
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    items: [
        {   
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            unitPrice: {
                type: Number,
                required: true,
                min: 0
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Purchase', purchaseItemSchema);

