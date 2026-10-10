import React from 'react';
import { useExpense } from '../context/ExpenseContext';
import { IncomeExpenseChart } from '../components/dashboard/IncomeExpenseChart';
import { CategoryPieChart } from '../components/dashboard/CategoryPieChart';
import { formatCurrency, formatPercentage, getMonthName } from '../utils/formatters';
import { TrendingUp, TrendingDown, PiggyBank, Target } from 'lucide-react';

export const AnalyticsPage = () => {
  const {
    totalIncome,
    totalExpenses,
    monthlyBudgetAmount,
    categoryChartData,
    monthlyTrendData,
    selectedMonth,
    selectedYear,
  } = useExpense();

  const netSavings = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? (netSavings / totalIncome) * 100 : 0;
  const monthLabel =
    selectedMonth === 0 ? 'All Time' : `${getMonthName(selectedMonth - 1)} ${selectedYear}`;

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
          Financial Analytics
        </h2>
        <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
          Visual insights and spending trends for {monthLabel}
        </p>
      </div>

      {/* Analytics KPI Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--primary-50)',
              color: 'var(--primary-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TrendingUp size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Earnings</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
              {formatCurrency(totalIncome)}
            </div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--expense-bg)',
              color: 'var(--expense-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TrendingDown size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Outflow</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
              {formatCurrency(totalExpenses)}
            </div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#eff6ff',
              color: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PiggyBank size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Net Saved</div>
            <div
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: netSavings >= 0 ? '#059669' : '#dc2626',
              }}
            >
              {formatCurrency(netSavings)}
            </div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--warning-bg)',
              color: 'var(--warning-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Target size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Savings Ratio</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
              {formatPercentage(savingsRate)}
            </div>
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts */}
      <div className="dashboard-charts-grid">
        <IncomeExpenseChart data={monthlyTrendData} />
        <CategoryPieChart categoryData={categoryChartData} />
      </div>
    </div>
  );
};
