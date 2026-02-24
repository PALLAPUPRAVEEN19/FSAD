import React from 'react';
import { motion } from 'motion/react';
import './StatusBadge.css';

const StatusBadge = ({ 
  children, 
  variant = 'neutral', 
  size = 'md',
  dot = false,
  className = ''
}) => {
  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`badge badge-${variant} badge-${size} ${className}`}
    >
      {dot && <span className={`badge-dot badge-dot-${variant}`} />}
      {children}
    </motion.span>
  );
};

export default StatusBadge;
