import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { StatCard } from '../common/StatCard';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

export const OverviewCards = ({
  totalIncome = 0,
  totalExpenses = 0,
  monthlyBudget = 0,
}) => {
  const totalBalance = totalIncome - totalExpenses;
  const remainingBudget = monthlyBudget > 0 ? monthlyBudget - totalExpenses : 0;
  const budgetUsagePercent = monthlyBudget > 0 ? (totalExpenses / monthlyBudget) * 100 : 0;

  return (
    <div className="stats-grid">
      <StatCard
        title="Total Balance"
        value={formatCurrency(totalBalance)}
        icon={DollarSign}
        theme="emerald"
        badgeText={totalBalance >= 0 ? 'Net Positive' : 'Deficit'}
        subtext="All-time accumulated net"
      />

      <StatCard
        title="Total Income"
        value={formatCurrency(totalIncome)}
        icon={TrendingUp}
        theme="emerald"
        badgeText="Earned"
        subtext="From all active sources"
      />

      <StatCard
        title="Total Expenses"
        value={formatCurrency(totalExpenses)}
        icon={TrendingDown}
        theme="rose"
        badgeText="Spent"
        subtext="Across all categories"
      />

      <StatCard
        title="Remaining Budget"
        value={formatCurrency(remainingBudget)}
        icon={Wallet}
        theme={remainingBudget < 0 ? 'rose' : budgetUsagePercent >= 80 ? 'amber' : 'emerald'}
        badgeText={monthlyBudget > 0 ? `${formatPercentage(budgetUsagePercent)} used` : 'No Limit'}
        subtext={
          monthlyBudget > 0
            ? remainingBudget >= 0
              ? `of ${formatCurrency(monthlyBudget)} limit`
              : 'Limit exceeded!'
            : 'Set a monthly limit'
        }
      />
    </div>
  );
};
