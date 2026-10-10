import React from 'react';
import { CATEGORY_COLORS } from '../../utils/constants';

export const Badge = ({ children, type, category, className = '' }) => {
  if (type === 'income') {
    return <span className={`badge badge-income ${className}`}>{children || 'Income'}</span>;
  }

  if (type === 'expense') {
    return <span className={`badge badge-expense ${className}`}>{children || 'Expense'}</span>;
  }

  if (category) {
    const color = CATEGORY_COLORS[category] || '#64748b';
    return (
      <span
        className={`badge ${className}`}
        style={{
          backgroundColor: `${color}15`,
          color: color,
          borderColor: `${color}30`,
          borderWidth: '1px',
          borderStyle: 'solid',
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: color,
            display: 'inline-block',
          }}
        />
        {category}
      </span>
    );
  }

  return <span className={`badge badge-category ${className}`}>{children}</span>;
};
