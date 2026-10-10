import React from 'react';
import { useExpense } from '../context/ExpenseContext';
import { BudgetCard } from '../components/budget/BudgetCard';
import { CategoryBudgetBreakdown } from '../components/budget/CategoryBudgetBreakdown';
import { getMonthName } from '../utils/formatters';

export const BudgetPage = () => {
  const {
    monthlyBudgetAmount,
    totalExpenses,
    currentMonthTransactions,
    selectedMonth,
    selectedYear,
    setIsBudgetModalOpen,
  } = useExpense();

  const monthLabel =
    selectedMonth === 0 ? 'All Time' : `${getMonthName(selectedMonth - 1)} ${selectedYear}`;

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
          Budget Management
        </h2>
        <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
          Monitor your financial limits and stay within monthly goals
        </p>
      </div>

      {/* Main Budget Status Card */}
      <BudgetCard
        budgetAmount={monthlyBudgetAmount}
        totalSpent={totalExpenses}
        onOpenBudgetModal={() => setIsBudgetModalOpen(true)}
        monthName={monthLabel}
      />

      {/* Category Breakdown */}
      <CategoryBudgetBreakdown
        expenses={currentMonthTransactions}
        totalBudget={monthlyBudgetAmount}
      />
    </div>
  );
};
