import React from 'react';

export const Loader = ({ message = 'Loading financial records...' }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        gap: '14px',
      }}
    >
      <div className="spinner" />
      <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 500 }}>
        {message}
      </span>
    </div>
  );
};
