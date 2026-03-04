//src/controllers/productController.js

const Product = require('../models/Product');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const product = new Product.create({
            ...req.body,
            image: req.file ? `/uploads/${req.file.filename}` : null
        });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all products
exports.getProducts = async (req, res) => {
    const products = await Product.find()
         .populate('categoryId', 'categoryName') // Populate category name
         .sort({ created_at: -1 }); // Sort by creation date    
    res.json(products);
};

// Update a product
exports.updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                ...(req.file && { image: `/uploads/${req.file.filename}` }) // Update image if a new file is uploaded
            },
            { new: true }
        );

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
};

