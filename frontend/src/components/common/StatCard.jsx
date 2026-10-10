import React from 'react';

export const StatCard = ({
  title,
  value,
  icon: Icon,
  theme = 'emerald',
  subtext,
  badgeText,
}) => {
  return (
    <div className={`card stat-card stat-${theme}`}>
      <div className="stat-header">
        <span className="stat-label">{title}</span>
        {Icon && (
          <div className="stat-icon">
            <Icon size={20} strokeWidth={2.2} />
          </div>
        )}
      </div>
      <div className="stat-value">{value}</div>
      {(subtext || badgeText) && (
        <div className="stat-subtext">
          {badgeText && (
            <span
              style={{
                fontWeight: 600,
                color: theme === 'emerald' ? '#059669' : theme === 'rose' ? '#dc2626' : '#2563eb',
              }}
            >
              {badgeText}
            </span>
          )}
          <span>{subtext}</span>
        </div>
      )}
    </div>
  );
};
