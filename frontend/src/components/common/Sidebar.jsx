import React from 'react';
import {
  LayoutDashboard,
  Receipt,
  Wallet,
  BarChart3,
  X,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

export const Sidebar = ({
  activePage,
  setActivePage,
  isOpen,
  onClose,
  isDemoMode,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
    { id: 'budget', label: 'Monthly Budget', icon: Wallet },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="brand-logo">
            <div className="brand-icon-box">
              <TrendingUp size={20} />
            </div>
            <span>ExpenseFlow</span>
          </div>
          <button
            type="button"
            className="btn-icon mobile-menu-btn"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActivePage(item.id);
                  if (onClose) onClose();
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-demo-badge">
            <Sparkles size={16} color="#10b981" />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.8rem' }}>
                {isDemoMode ? 'Demo Data Mode' : 'Connected to API'}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {isDemoMode ? 'Showing sample records' : 'Real database live'}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
