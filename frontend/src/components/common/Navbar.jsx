import React from 'react';
import { Menu, Plus, Calendar } from 'lucide-react';
import { getMonthName } from '../../utils/formatters';

export const Navbar = ({
  title,
  subtitle,
  onOpenMobileMenu,
  onOpenAddModal,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  isDemoMode,
  onToggleDemoMode,
}) => {
  const currentYear = new Date().getFullYear();
  const months = [
    { value: 0, label: 'All Months' },
    ...Array.from({ length: 12 }, (_, i) => ({
      value: i + 1,
      label: getMonthName(i),
    })),
  ];

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={onOpenMobileMenu}
          aria-label="Open sidebar menu"
        >
          <Menu size={22} />
        </button>
        <div>
          <h1 className="navbar-title">{title}</h1>
          {subtitle && <p className="navbar-subtitle">{subtitle}</p>}
        </div>
      </div>

      <div className="navbar-right">
        {/* Month Filter Selector */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--bg-surface-subtle)',
            padding: '5px 10px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
          }}
        >
          <Calendar size={15} color="var(--text-muted)" />
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '0.84rem',
              fontWeight: 500,
              color: 'var(--text-main)',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
          <span style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>{selectedYear}</span>
        </div>

        {/* Demo Mode / Live Mode Toggle Button */}
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={onToggleDemoMode}
          title="Toggle between demo transactions and live MongoDB database"
          style={{
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            borderColor: isDemoMode ? 'var(--border-color)' : 'var(--primary-200)',
            backgroundColor: isDemoMode ? 'var(--bg-surface)' : 'var(--primary-50)',
            color: isDemoMode ? 'var(--text-main)' : 'var(--primary-800)',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: isDemoMode ? '#f59e0b' : '#10b981',
            }}
          />
          <span>{isDemoMode ? 'Demo Mode' : 'Live MongoDB'}</span>
        </button>

        {/* Add Transaction Button */}
        <button
          type="button"
          className="btn btn-primary"
          onClick={onOpenAddModal}
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>Add Transaction</span>
        </button>
      </div>
    </header>
  );
};
