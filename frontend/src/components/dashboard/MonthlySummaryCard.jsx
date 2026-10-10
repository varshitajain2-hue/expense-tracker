import React from 'react';
import { Calendar, PiggyBank, Flame, Layers } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

export const MonthlySummaryCard = ({
  income = 0,
  expenses = 0,
  transactions = [],
  monthName = 'This Month',
}) => {
  // Compute savings rate
  const savings = income - expenses;
  const savingsRate = income > 0 ? (savings / income) * 100 : 0;

  // Compute daily average spending for the month
  const expenseTransactions = transactions.filter((t) => t.type === 'expense');
  const now = new Date();
  const daysPassed = Math.max(1, now.getDate());
  const dailyAverage = expenses / daysPassed;

  // Find top spending category
  const categoryTotals = {};
  expenseTransactions.forEach((t) => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + Number(t.amount);
  });

  let topCategory = 'None';
  let topAmount = 0;
  Object.entries(categoryTotals).forEach(([cat, amt]) => {
    if (amt > topAmount) {
      topAmount = amt;
      topCategory = cat;
    }
  });

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">Monthly Summary</h3>
          <p className="card-subtitle">{monthName} financial metrics</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Savings Rate */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 14px',
            backgroundColor: 'var(--bg-surface-subtle)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'var(--primary-50)',
                color: 'var(--primary-600)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PiggyBank size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Savings Rate</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>
                {formatPercentage(savingsRate)}
              </div>
            </div>
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: savings >= 0 ? '#059669' : '#dc2626' }}>
            {savings >= 0 ? '+' : ''}{formatCurrency(savings)}
          </span>
        </div>

        {/* Daily Average Expense */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 14px',
            backgroundColor: 'var(--bg-surface-subtle)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#eff6ff',
                color: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Calendar size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Daily Avg Spending</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>
                {formatCurrency(dailyAverage)} / day
              </div>
            </div>
          </div>
        </div>

        {/* Top Expense Category */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 14px',
            backgroundColor: 'var(--bg-surface-subtle)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'var(--warning-bg)',
                color: 'var(--warning-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Flame size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Top Expense Category</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>
                {topCategory}
              </div>
            </div>
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
            {formatCurrency(topAmount)}
          </span>
        </div>

        {/* Total Count */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 14px',
            backgroundColor: 'var(--bg-surface-subtle)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#f3e8ff',
                color: '#8b5cf6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Layers size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Total Transactions</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>
                {transactions.length} records
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
