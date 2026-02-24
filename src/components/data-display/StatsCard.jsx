import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import './StatsCard.css';

const StatsCard = ({ label, value, trend, trendDirection = 'up', icon, color = 'indigo' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`stats-card stats-card-${color}`}
    >
      <div className="stats-card-header">
        <p className="stats-card-label">{label}</p>
        {icon && <div className="stats-card-icon">{icon}</div>}
      </div>

      <div className="stats-card-body">
        <h2 className="stats-card-value">{value}</h2>
        {trend && (
          <div className={`stats-card-trend stats-card-trend-${trendDirection}`}>
            {trendDirection === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatsCard;
