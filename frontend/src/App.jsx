import React, { useState } from 'react';
import { ExpenseProvider, useExpense } from './context/ExpenseContext';
import { Sidebar } from './components/common/Sidebar';
import { Navbar } from './components/common/Navbar';
import { Toast } from './components/common/Toast';
import { ConfirmDialog } from './components/common/ConfirmDialog';
import { TransactionModal } from './components/transactions/TransactionModal';
import { BudgetModal } from './components/budget/BudgetModal';
import { DashboardPage } from './pages/DashboardPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { BudgetPage } from './pages/BudgetPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ErrorBoundary } from './components/common/ErrorBoundary';

const AppContent = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const {
    activePage,
    setActivePage,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    isDemoMode,
    toggleDemoMode,
    // Modals
    isTransactionModalOpen,
    setIsTransactionModalOpen,
    editingTransaction,
    setEditingTransaction,
    isBudgetModalOpen,
    setIsBudgetModalOpen,
    deletingTransaction,
    setDeletingTransaction,
    // Actions
    addTransaction,
    updateTransaction,
    deleteTransaction,
    saveBudget,
    currentBudget,
    monthlyBudgetAmount,
    // Notifications
    toasts,
    dismissToast,
    isLoading,
  } = useExpense();

  const getPageTitle = () => {
    switch (activePage) {
      case 'transactions':
        return { title: 'Transactions', subtitle: 'Manage and review your revenue and expenses' };
      case 'budget':
        return { title: 'Monthly Budget', subtitle: 'Manage your monthly spending allocations' };
      case 'analytics':
        return { title: 'Financial Analytics', subtitle: 'Deep dive into trends and distribution' };
      default:
        return { title: 'Dashboard', subtitle: 'Financial overview and recent activity' };
    }
  };

  const { title, subtitle } = getPageTitle();

  const handleTransactionSubmit = (formData) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction._id || editingTransaction.id, formData);
    } else {
      addTransaction(formData);
    }
  };

  const handleConfirmDelete = () => {
    if (deletingTransaction) {
      deleteTransaction(deletingTransaction._id || deletingTransaction.id);
    }
  };

  return (
    <div className="app-layout">
      {/* Sidebar navigation */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        isDemoMode={isDemoMode}
      />

      {/* Main wrapper */}
      <div className="main-wrapper">
        <Navbar
          title={title}
          subtitle={subtitle}
          onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
          onOpenAddModal={() => {
            setEditingTransaction(null);
            setIsTransactionModalOpen(true);
          }}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          isDemoMode={isDemoMode}
          onToggleDemoMode={toggleDemoMode}
        />

        <main className="main-content">
          {activePage === 'dashboard' && <DashboardPage />}
          {activePage === 'transactions' && <TransactionsPage />}
          {activePage === 'budget' && <BudgetPage />}
          {activePage === 'analytics' && <AnalyticsPage />}
        </main>
      </div>

      {/* Add / Edit Transaction Modal */}
      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={() => {
          setIsTransactionModalOpen(false);
          setEditingTransaction(null);
        }}
        onSubmit={handleTransactionSubmit}
        initialData={editingTransaction}
        isLoading={isLoading}
      />

      {/* Set / Adjust Budget Modal */}
      <BudgetModal
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
        onSubmit={saveBudget}
        currentBudget={currentBudget}
        activeMonth={selectedMonth}
        activeYear={selectedYear}
        isLoading={isLoading}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={Boolean(deletingTransaction)}
        onClose={() => setDeletingTransaction(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Transaction"
        message={`Are you sure you want to delete "${deletingTransaction?.description}"? This action cannot be undone.`}
        confirmText="Delete Transaction"
        isLoading={isLoading}
      />

      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <ExpenseProvider>
        <AppContent />
      </ExpenseProvider>
    </ErrorBoundary>
  );
}
