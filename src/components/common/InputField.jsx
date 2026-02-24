import React from 'react';
import './InputField.css';

const InputField = ({
  label,
  type = 'text',
  icon,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className={`input-field-container ${className}`}>
      {label && (
        <label className="input-label">
          {label}
        </label>
      )}
      <div className="input-wrapper">
        {icon && (
          <div className="input-icon">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={`input ${icon ? 'input-with-icon' : ''} ${error ? 'input-error' : ''}`}
          {...props}
        />
      </div>
      {error && (
        <span className="input-error-message">{error}</span>
      )}
    </div>
  );
};

export default InputField;
