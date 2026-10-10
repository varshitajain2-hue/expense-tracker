import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { CATEGORY_COLORS } from '../../utils/constants';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '10px 14px',
          boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: data.payload.fill,
            }}
          />
          <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#0f172a' }}>
            {data.name}
          </span>
        </div>
        <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
          Amount: <strong style={{ color: '#0f172a' }}>{formatCurrency(data.value)}</strong>
        </div>
        {data.payload.percentage !== undefined && (
          <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600 }}>
            {formatPercentage(data.payload.percentage)} of expenses
          </div>
        )}
      </div>
    );
  }
  return null;
};

export const CategoryPieChart = ({ categoryData = [] }) => {
  const total = categoryData.reduce((sum, item) => sum + item.value, 0);

  const formattedData = categoryData.map((item) => ({
    ...item,
    percentage: total > 0 ? (item.value / total) * 100 : 0,
    color: CATEGORY_COLORS[item.name] || '#94a3b8',
  }));

  return (
    <div className="card" style={{ height: '380px', display: 'flex', flexDirection: 'column' }}>
      <div className="card-header">
        <div>
          <h3 className="card-title">Expense by Category</h3>
          <p className="card-subtitle">Spending distribution</p>
        </div>
      </div>

      <div style={{ flex: 1, width: '100%', minHeight: 0, position: 'relative' }}>
        {formattedData.length === 0 ? (
          <div
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
            }}
          >
            No expenses recorded for this period
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ height: '200px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<CustomTooltip />} />
                  <Pie
                    data={formattedData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {formattedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Compact Legend List */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                paddingTop: '6px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              {formattedData.slice(0, 5).map((item) => (
                <div
                  key={item.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.8rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: item.color,
                      }}
                    />
                    <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{item.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                      {formatCurrency(item.value)}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                      ({formatPercentage(item.percentage, 0)})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
