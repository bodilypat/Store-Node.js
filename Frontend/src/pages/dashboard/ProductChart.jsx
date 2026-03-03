//ProductChart.jsx      # Pie char for product categories

import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

/* Register chart.js components */
ChartJS.register(ArcElement, Tooltip, Legend);

function ProductChart({ data, title = "Product by Categories" }) {
    // Prepare chart data
    const chartData = {
        labels: data.map((item) => item.category),
        datasets: [
            {
                label: "Products",
                data: data.map((item) => item.count),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)", 
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",    
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
                hoverOffset: 10,
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: title,
            },
        },
    };

    return (
        <div className="product-chart">
            <Pie data={chartData} options={options} />
        </div>
    );
}

export default ProductChart;
