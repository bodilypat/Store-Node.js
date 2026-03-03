//src/pages/sales/SaleRow.jsx       # Single row for sales table

import React from 'react';

function SaleRow({ sale, onDelete }) {
    return (
        <tr className="border-b hover:bg-gray-50"
            onClick={() => console.log('Navigate to sale details', sale.id)}
        >
            <td className="px-4 py-2">{sale.id}</td>
            <td className="px-4 py-2">{sale.customerName}</td>
            <td className="px-4 py-2">{sale.productName}</td>
            <td className="px-4 py-2">${sale.amount.toFixed(2)}</td>
            <td className="px-4 py-2">{new Date(sale.date).toLocaleDateString()}</td>
            <td className="px-4 py-2">
                <button
                    className="text-red-500 hover:text-red-700"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent row click
                        onDelete(sale.id);
                    }}
                >
                    Delete  
                </button>
            </td>
        </tr>
    );
}
export default SaleRow;

