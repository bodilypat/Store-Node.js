//src/controllers/purchaseController.js 

const mongoose = require('mongoose');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');

exports.createPurchase = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { supplierId, purchasesDate, totalAmount, items } = req.body;

        if (!supplierId || !totalAmount || !items || !Array.isArray(items) || items.length === 0) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ error: 'Missing required fields or items array is empty' });
        }
        
        const purchase = new Purchase({
            supplierId,
            purchasesDate,
            totalAmount,
            items
        });
        await purchase.save({ session });

        for (const item of items) {
            const { product_id, quantity } = item;
            const product = await Product.findById(product_id).session(session);
            if (!product) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({ error: `Product with ID ${product_id} not found` });
            }
            product.stockQuantity += quantity;
            await product.save({ session });
        }

        await session.commitTransaction();
        session.endSession();
        res.status(201).json(purchase);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error creating purchase:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find().populate('supplierId').populate('items.product_id');
        res.json(purchases);
    } catch (error) {
        console.error('Error fetching purchases:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getPurchaseById = async (req, res) => {
    try {
        const purchase = await Purchase.findById(req.params.id).populate('supplierId').populate('items.product_id');
        if (!purchase) {
            return res.status(404).json({ error: 'Purchase not found' });
        }
        res.json(purchase);
    } catch (error) {
        console.error('Error fetching purchase:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updatePurchase = async (req, res) => {
    try {
        const purchase = await Purchase.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!purchase) {
            return res.status(404).json({ error: 'Purchase not found' });
        }
        res.json(purchase);
    } catch (error) {
        console.error('Error updating purchase:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deletePurchase = async (req, res) => {
  const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const purchase = await Purchase.findById(req.params.id).session(session);
        if (!purchase) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ error: 'Purchase not found' });
        }

        for (const item of purchase.items) {
            const product = await Product.findById(item.product_id).session(session);
            if (product) {
                product.stockQuantity -= item.quantity;
                await product.save({ session });
            }
        }

        await purchase.remove({ session });
        await session.commitTransaction();
        session.endSession();
        res.json({ message: 'Purchase deleted successfully' });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error deleting purchase:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



