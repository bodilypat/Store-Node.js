//src/controllers/productController.js 

const Product = require('../models/productModel');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { productName, categoryId, barcode, purchasePrice, sellingPrice, stockQuantity, description } = req.body;
        const newProduct = new Product({
            productName,
            categoryId,
            barcode,
            purchasePrice,
            sellingPrice,
            stockQuantity,
            description
        });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }   
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const { productName, categoryId, barcode, purchasePrice, sellingPrice, stockQuantity, description } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { productName, categoryId, barcode, purchasePrice, sellingPrice, stockQuantity, description },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    if ( window.confirm('Are you sure you want to delete this product?') ) {
        try {
            const deletedProduct = await Product.findByIdAndDelete(req.params.id);
            if (!deletedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product', error });
        }
    } else {
        res.status(400).json({ message: 'Product deletion cancelled' });
    }
};



