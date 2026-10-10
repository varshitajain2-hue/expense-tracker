import React from 'react';
import { CATEGORY_COLORS, EXPENSE_CATEGORIES } from '../../utils/constants';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

export const CategoryBudgetBreakdown = ({ expenses = [], totalBudget = 0 }) => {
  // Aggregate expenses per category
  const categoryTotals = {};
  EXPENSE_CATEGORIES.forEach((cat) => {
    categoryTotals[cat] = 0;
  });

  let totalExpenseAmount = 0;
  expenses.forEach((tx) => {
    if (tx.type === 'expense') {
      const amt = Number(tx.amount);
      categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + amt;
      totalExpenseAmount += amt;
    }
  });

  const sortedCategories = Object.entries(categoryTotals)
    .filter(([_, amt]) => amt > 0)
    .sort((a, b) => b[1] - a[1]);

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">Category Spending Breakdown</h3>
          <p className="card-subtitle">Detailed allocation across expense areas</p>
        </div>
      </div>

      {sortedCategories.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '32px 16px', color: 'var(--text-muted)' }}>
          No expense records found for this period.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {sortedCategories.map(([category, amount]) => {
            const pctOfExpenses = totalExpenseAmount > 0 ? (amount / totalExpenseAmount) * 100 : 0;
            const pctOfBudget = totalBudget > 0 ? (amount / totalBudget) * 100 : 0;
            const color = CATEGORY_COLORS[category] || '#64748b';

            return (
              <div key={category}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '6px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: color,
                      }}
                    />
                    <span style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-main)' }}>
                      {category}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                      {formatCurrency(amount)}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      ({formatPercentage(pctOfExpenses)} of spent)
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    width: '100%',
                    height: '6px',
                    backgroundColor: '#f1f5f9',
                    borderRadius: '9999px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${Math.min(100, pctOfExpenses)}%`,
                      backgroundColor: color,
                      borderRadius: '9999px',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
