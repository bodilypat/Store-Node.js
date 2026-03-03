//src/pages/sales/SaleForm.jsx    # Form to create a new sale

import React, { useState, useEffect } from 'react';
import API from '../../services/saleService';

function SaleForm({ onSubmit, onClose }) {
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [saleItems, setSaleItems] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [productSelection, setProductSelection] = useState({ 
        productId: '', 
        quantity: 1,
        sellingPrice: 0,
    });

    // Fetch customers and products from backend 
    useEffect(() => {
        API.getCustomers("/customers")
            .then(response => setCustomers(response.data))
            .catch(error => console.error('Error fetching customers:', error));

        API.getProducts("/products")
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    // Add product to sale items
    const handleAddProduct = () => {
        if (productSelection.productId && productSelection.quantity > 0) {
            const product = products.find(p => p.id === parseInt(productSelection.productId));

            /* Check if product already added */
            const existingItemIndex = saleItems.findIndex(item => item.product_id === product.id);
            if (existingItemIndex !== -1) {
                // Update quantity and selling price if product already in sale items
                setSaleItems(prevItems => {
                    const updatedItems = [...prevItems];
                    updatedItems[existingItemIndex] = {
                        ...updatedItems[existingItemIndex],
                        quantity: updatedItems[existingItemIndex].quantity + productSelection.quantity,
                    };
                    return updatedItems;
                });
            } else {
                setSaleItems(prevItems => [
                    ...prevItems,
                    {
                        product_id: product.id,
                        product_name: product.name,
                        quantity: productSelection.quantity,
                        selling_price: productSelection.sellingPrice || product.selling_price,
                    }
                ]);
            }
            // Reset product selection
            setProductSelection({ productId: '', quantity: 1, sellingPrice: 0 });
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedCustomer && saleItems.length > 0) {
            const saleData = {
                customer_id: selectedCustomer,
                items: saleItems,
            };
            onSubmit(saleData); // Parent component handles API request
        } else {
            alert('Please select a customer and add at least one product to the sale.');
        }   
    };

    return (
        <div className="sale-form-overlay">
            <h2 className="sale-form-title">Add New Sale</h2>
            <form className="sale-form" onSubmit={handleSubmit}>
                {/* Customer Selection */}
                <div className="form-group">
                    <label htmlFor="customer">Customer:</label>
                    <select 
                        id="customer" 
                        value={selectedCustomer} 
                        onChange={(e) => setSelectedCustomer(e.target.value)}
                    >
                        <option value="">Select Customer</option>
                        {customers.map(customer => (
                            <option key={customer.id} value={customer.id}>{customer.name}</option>
                        ))}
                    </select>
                </div>
                {/* Product Selection */}
                <div className="form-group">
                    <label htmlFor="product">Product:</label>
                    <select
                        id="product"
                        value={productSelection.productId}
                        onChange={(e) => setProductSelection(prev => ({ ...prev, productId: e.target.value }))}
                    >
                        <option value="">Select Product</option>
                        {products.map(product => (
                            <option key={product.id} value={product.id}>
                                {product.name} (Stock: {product.stock_quantity})
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        min="1"
                        placeholder="Quantity"
                        value={productSelection.quantity}
                        onChange={(e) => setProductSelection(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
                    />
                    <input
                        type="number"
                        min="0"
                        placeholder="Selling Price (optional)"
                        value={productSelection.sellingPrice}
                        onChange={(e) => setProductSelection(prev => ({ ...prev, sellingPrice: parseFloat(e.target.value) }))}
                    />
                    <button type="button" onClick={handleAddProduct}>Add Product</button>
                </div>
                {/* Sale Items Table */}
                {saleItems.length > 0 && (
                    <table className="sale-items-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Selling Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {saleItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.product_name}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.selling_price.toFixed(2)}</td>
                                    <td>${(item.quantity * item.selling_price).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="form-buttons">
                    <button type="submit" className="submit-btn">Submit Sale</button>
                    <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
}
export default SaleForm;


