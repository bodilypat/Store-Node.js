//src/controllers/saleController.js # with Stock update + transaction 

const Sale = require('../models/Sale');
const Product = require('../models/Product');


// Create a new sale
exports.createSale = async (req, res) => {
    const { customer_id, items } = req.body;
    try {
        const sale = new Sale({ customer_id, items });
        await sale.save();
        res.status(201).json(sale);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }   
};

// Get all sales
exports.getAllSales = async (req, res) => {
    try {
        const sales = await Sale.find().populate('customer_id').populate('items.productId');
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a sale by ID
exports.getSaleById = async (req, res) => {
    const { id } = req.params;
    try {
        const sale = await Sale.findById(id).populate('customer_id').populate('items.productId');
        if (!sale) {
            return res.status(404).json({ error: 'Sale not found' });
        }
        res.status(200).json(sale);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a sale
exports.updateSale = async (req, res) => {
    const { id } = req.params;
    const { customer_id, items } = req.body;
    try {
        const sale = await Sale.findByIdAndUpdate(id, { customer_id, items }, { new: true });
        if (!sale) {
            return res.status(404).json({ error: 'Sale not found' });
        }
        res.status(200).json(sale);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }   
};

// Delete a sale
exports.deleteSale = async (req, res) => {
    const { id } = req.params;  
    try {
        const sale = await Sale.findByIdAndDelete(id);  
        if (!sale) {
            return res.status(404).json({ error: 'Sale not found' });
        }   
        res.status(200).json({ message: 'Sale deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }   
};


// Update stock quantity after a sale
exports.updateStockAfterSale = async (sale) => {
    try {
        for (const item of sale.items) {
            const product = await Product.findById(item.productId);
            if (product) {
                product.stockQuantity -= item.quantity;
                await product.save();
            }
        }
    } catch (error) {
        console.error('Error updating stock after sale:', error);
    }
};









