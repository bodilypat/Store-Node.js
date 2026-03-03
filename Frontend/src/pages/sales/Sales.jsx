//src/pages/Sales.jsx  # Main sales page (list & actions)

import React, { useEffect, useState } from 'react';
import saleService from '../services/saleService';
import SaleRow from './SaleRow';
import SaleForm from './SaleForm';

function Sales() {
    const [sales, setSales] = useState([]);
    const [showForm, setShowForm] = useState(false);

    // Fetch all sales 
    const fetchSales = async () => {
        try {
            const response = await saleService.getSales();
            setSales(response.data);
        } catch (error) {
            console.error('Error fetching sales:', error);
        }
    };

    useEffect(() => {
        fetchSales();
    }, []);

    // Handle adding a new sale 
    const handleAddSale = async (saleData) => {
        try {
            await saleService.createSale(saleData);
            fetchSales(); // Refresh sales list after adding
            setShowForm(false); // Close form after submission
        } catch (error) {
            console.error('Error adding sale:', error);
        }
    };

    // Handle delete sale 
    const handleDeleteSale = async (saleId) => {
        if (window.confirm('Are you sure you want to delete this sale?')) {
            try {
                await saleService.deleteSale(saleId);
                fetchSales(); // Refresh sales list after deletion
            } catch (error) {
                console.error('Error deleting sale:', error);
            }
        }
    };

    return (
        <div className="sales-container">
            <h1 className="sales-title">Sales</h1>
            <button
                onClick={() => setShowForm(true)}
                className="add-sale-button"
            >
                Add Sale
            </button>
            {/* Sale Form Modal */}
            {showForm && (
                <SaleForm
                    onClose={() => setShowForm(false)}  
                    onSubmit={handleAddSale}
                />
            )}
            {/* Sales Table */}
            <div className="sales-table-container">
                <table className="sales-table">
                    <thead>
                        <tr>
                            <th className="sales-table-header">Sale ID</th>
                            <th className="sales-table-header">Customer</th>
                            <th className="sales-table-header">Date</th>
                            <th className="sales-table-header">Total Amount</th>
                            <th className="sales-table-header">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="no-sales">
                                    No sales recorded yet.
                                </td>
                            </tr>
                        ) : (
                            sales.map(sale => (
                                <SaleRow
                                    key={sale.id}
                                    sale={sale}
                                    onDelete={handleDeleteSale}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>  
        </div>
    );
}

export default Sales;
