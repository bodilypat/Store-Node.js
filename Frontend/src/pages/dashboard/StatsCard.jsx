//src/pages/dashbord/StatsCard.jsx  # Individual statistic card

import React from "react";
import "./StatsCard.css";

function StatsCard({ title, value, icon, bgColor = "bg-white" }) {
    return (
        <div className={`stats-card ${bgColor}`} shadow-lg rounded-lg p-4 flex items-center gap-4>
            {/* Optional Icon */}
            <div className="stats-icon">{icon}</div>
            <div className="stats-info">
                <h3>{title}</h3>
                <p>{value}</p>
            </div>
        </div>
    )
}

export default StatsCard;

