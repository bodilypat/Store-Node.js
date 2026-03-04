//src/routes/productRoutes.js 

const express = require('express');
const router = express.Router();

const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Admin only
router.post(
    '/', 
    protect, 
    authorize('admin'), 
    upload.single('image'), 
    createProduct
);

// Admin and Staff
router.get(
    '/', 
    protect, 
    authorize('admin', 'staff'), 
    getProducts
);

router.get(
    '/:id', 
    protect, 
    authorize('admin', 'staff'), 
    getProductById
);

router.put(
    '/:id', 
    protect,
    authorize('admin'),
    upload.single('image'), 
    updateProduct
);

router.delete(
    '/:id', 
    protect, 
    authorize('admin'), 
    deleteProduct
);

module.exports = router;
