//src/Sale.js
/* 
 //sales Collection
{
    "_id": ObjectId("..."),
    "customer_id": ObjectId("..."), // Reference to Customers Collection
    "saleDate": ISODate(""),
    "items": [
        {
            "productId": ObjectId("..."), // Reference to Products Collection
            "quantity": 0,
            "unitPrice": 0.00
        }
    ],
} */

const mongoose = require('mongoose');

const saleItemSchema = new mongoose.Schema({
    customer_id: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    saleDate: {
        type: Date,
        default: Date.now
    },
    items: [
        {
            productId: {
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

saleItemSchema.pre('save', async function(next) {
    const Sale = this;
    for (const item of Sale.items) {
        const Product = mongoose.model('Product');
        const product = await Product.findById(item.productId);
        if (!product) {
            return next(new Error(`Product with ID ${item.productId} not found`));
        }
        if (product.stockQuantity < item.quantity) {
            return next(new Error(`Insufficient stock for product ${product.productName}`));
        }
        product.stockQuantity -= item.quantity;
        await product.save();
    }
    next();
});

module.exports = mongoose.model('Sale', saleItemSchema);




