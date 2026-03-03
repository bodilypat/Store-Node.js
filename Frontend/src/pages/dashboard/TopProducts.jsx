//src/pages/dashboard/TopProducts.jsx

import React from 'react';

function TopProducts({ data, title = 'Top Selling Products' }) {
    return (
        <div className="bg-white shadow-lg rounded-lg p-5">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Product</th>
                            <th className="py-2 px-4 border-b">Category</th>
                            <th className="py-2 px-4 border-b">Sales</th>
                            <th className="py-2 px-4 border-b">Revenue</th>
                        </tr>   
                    </thead>
                    <tbody>
                        {data.map((product, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{product.name}</td>
                                <td className="py-2 px-4 border-b">{product.category}</td>
                                <td className="py-2 px-4 border-b">{product.sales}</td>
                                <td className="py-2 px-4 border-b">${product.revenue.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>  
                </table>
            </div>
        </div>
    );
}

export default TopProducts;


                
                


