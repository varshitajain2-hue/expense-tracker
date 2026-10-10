import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ toasts = [], onDismiss }) => {
  if (!toasts.length) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={18} color="#10b981" />;
      case 'error':
        return <AlertCircle size={18} color="#ef4444" />;
      default:
        return <Info size={18} color="#3b82f6" />;
    }
  };

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type || 'info'}`}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {getIcon(toast.type)}
          </div>
          <div style={{ flex: 1, fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-main)' }}>
            {toast.message}
          </div>
          <button
            type="button"
            className="btn-icon"
            style={{ padding: '4px' }}
            onClick={() => onDismiss(toast.id)}
            aria-label="Dismiss toast"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
