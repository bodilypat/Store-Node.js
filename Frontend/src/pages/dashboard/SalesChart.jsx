//src/pages/dashboard/SalesChart.jsx           # Line chart for sales over time

import React from "react";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

/* Register chart.js components */
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
);

function SalesChart({ data, title = "Sales Over Time" }) {
    // Prepare chart data
    const chartData = {
        labels: data.map((item) => item.date), 
        datasets: [
            {
                label: "Sales",
                data: data.map((item) => item.total_sales),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
                tension: 0.4,
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
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Date",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Total Sales",
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="sales-chart">
            <Line data={chartData} options={options} />
        </div>
    );
}

export default SalesChart;

