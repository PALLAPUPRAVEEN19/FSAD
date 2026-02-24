import React from 'react';
import { Loader2 } from 'lucide-react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'md', text, fullScreen = false }) => {
  const sizeMap = {
    sm: 16,
    md: 32,
    lg: 48,
    xl: 64
  };

  const content = (
    <div className="loading-spinner-content">
      <Loader2 size={sizeMap[size]} className="spinner-icon" />
      {text && <p className="spinner-text">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="loading-spinner-fullscreen">
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingSpinner;
