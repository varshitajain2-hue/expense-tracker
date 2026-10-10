import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Edit3, Target } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

export const BudgetCard = ({
  budgetAmount = 0,
  totalSpent = 0,
  onOpenBudgetModal,
  monthName = 'This Month',
}) => {
  const remaining = budgetAmount > 0 ? budgetAmount - totalSpent : 0;
  const percentage = budgetAmount > 0 ? Math.min(200, (totalSpent / budgetAmount) * 100) : 0;
  const isOverBudget = budgetAmount > 0 && totalSpent > budgetAmount;
  const isNearBudget = budgetAmount > 0 && percentage >= 80 && !isOverBudget;

  const getStatusType = () => {
    if (budgetAmount <= 0) return 'none';
    if (isOverBudget) return 'danger';
    if (isNearBudget) return 'warning';
    return 'safe';
  };

  const status = getStatusType();

  return (
    <div className="card" style={{ marginBottom: '24px' }}>
      <div className="card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--primary-50)',
              color: 'var(--primary-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Target size={20} />
          </div>
          <div>
            <h3 className="card-title">Monthly Spending Budget</h3>
            <p className="card-subtitle">Target limit for {monthName}</p>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={onOpenBudgetModal}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Edit3 size={14} />
          <span>{budgetAmount > 0 ? 'Adjust Budget' : 'Set Budget'}</span>
        </button>
      </div>

      {budgetAmount <= 0 ? (
        <div
          style={{
            padding: '24px',
            backgroundColor: 'var(--bg-surface-subtle)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
          }}
        >
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '12px' }}>
            No monthly spending limit has been configured for {monthName}.
          </p>
          <button type="button" className="btn btn-primary btn-sm" onClick={onOpenBudgetModal}>
            Set Monthly Budget Now
          </button>
        </div>
      ) : (
        <div>
          {/* Metrics summary */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              marginBottom: '16px',
            }}
          >
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Budget Limit
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                {formatCurrency(budgetAmount)}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Total Spent
              </div>
              <div
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: isOverBudget ? 'var(--expense-color)' : 'var(--text-main)',
                  marginTop: '2px',
                }}
              >
                {formatCurrency(totalSpent)}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Remaining
              </div>
              <div
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: isOverBudget ? '#dc2626' : isNearBudget ? '#d97706' : 'var(--primary-600)',
                  marginTop: '2px',
                }}
              >
                {formatCurrency(remaining)}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>
                Budget Consumption
              </span>
              <span
                style={{
                  fontWeight: 700,
                  color:
                    status === 'danger'
                      ? 'var(--expense-color)'
                      : status === 'warning'
                      ? 'var(--warning-color)'
                      : 'var(--primary-600)',
                }}
              >
                {formatPercentage(percentage)}
              </span>
            </div>

            <div className="progress-track">
              <div
                className={`progress-fill ${status}`}
                style={{ width: `${Math.min(100, percentage)}%` }}
              />
            </div>
          </div>

          {/* Warning / Status Alert Box */}
          {isOverBudget && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--expense-bg)',
                border: '1px solid var(--expense-border)',
                color: '#b91c1c',
                fontSize: '0.85rem',
                fontWeight: 500,
              }}
            >
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>
                <strong>Warning:</strong> You have exceeded your monthly budget by{' '}
                {formatCurrency(totalSpent - budgetAmount)}. Consider reviewing discretionary expenses.
              </span>
            </div>
          )}

          {isNearBudget && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--warning-bg)',
                border: '1px solid #fde68a',
                color: '#92400e',
                fontSize: '0.85rem',
                fontWeight: 500,
              }}
            >
              <AlertTriangle size={18} style={{ flexShrink: 0 }} />
              <span>
                <strong>Attention:</strong> You have used {formatPercentage(percentage)} of your
                budget. Only {formatCurrency(remaining)} remaining this month.
              </span>
            </div>
          )}

          {!isOverBudget && !isNearBudget && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--primary-50)',
                border: '1px solid var(--primary-200)',
                color: 'var(--primary-800)',
                fontSize: '0.84rem',
              }}
            >
              <CheckCircle2 size={16} color="var(--primary-600)" style={{ flexShrink: 0 }} />
              <span>You are well within your monthly budget. Keep up the disciplined spending!</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
