import React from 'react';
import { useExpense } from '../context/ExpenseContext';
import { OverviewCards } from '../components/dashboard/OverviewCards';
import { IncomeExpenseChart } from '../components/dashboard/IncomeExpenseChart';
import { CategoryPieChart } from '../components/dashboard/CategoryPieChart';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { MonthlySummaryCard } from '../components/dashboard/MonthlySummaryCard';
import { BudgetCard } from '../components/budget/BudgetCard';
import { getMonthName } from '../utils/formatters';

export const DashboardPage = () => {
  const {
    totalIncome,
    totalExpenses,
    monthlyBudgetAmount,
    categoryChartData,
    monthlyTrendData,
    currentMonthTransactions,
    setActivePage,
    setEditingTransaction,
    setIsTransactionModalOpen,
    setIsBudgetModalOpen,
    selectedMonth,
  } = useExpense();

  const handleEdit = (tx) => {
    setEditingTransaction(tx);
    setIsTransactionModalOpen(true);
  };

  const monthLabel =
    selectedMonth === 0 ? 'All Time' : `${getMonthName(selectedMonth - 1)}`;

  return (
    <div>
      {/* Dynamic KPI Overview Cards */}
      <OverviewCards
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        monthlyBudget={monthlyBudgetAmount}
      />

      {/* Budget Banner Widget */}
      <BudgetCard
        budgetAmount={monthlyBudgetAmount}
        totalSpent={totalExpenses}
        onOpenBudgetModal={() => setIsBudgetModalOpen(true)}
        monthName={monthLabel}
      />

      {/* Recharts Analytics Row */}
      <div className="dashboard-charts-grid">
        <IncomeExpenseChart data={monthlyTrendData} />
        <CategoryPieChart categoryData={categoryChartData} />
      </div>

      {/* Bottom Section: Recent Activity & Monthly Summary */}
      <div className="dashboard-bottom-grid">
        <RecentTransactions
          transactions={currentMonthTransactions}
          onNavigateToAll={() => setActivePage('transactions')}
          onEdit={handleEdit}
        />
        <MonthlySummaryCard
          income={totalIncome}
          expenses={totalExpenses}
          transactions={currentMonthTransactions}
          monthName={monthLabel}
        />
      </div>
    </div>
  );
};
