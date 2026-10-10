import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { DEMO_TRANSACTIONS, INITIAL_DEMO_BUDGETS } from '../data/demoData';
import { transactionService } from '../services/transactionService';
import { budgetService } from '../services/budgetService';
import { getMonthName } from '../utils/formatters';

const ExpenseContext = createContext(null);

export const ExpenseProvider = ({ children }) => {
  // Navigation & Date State
  const [activePage, setActivePage] = useState('dashboard');
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1); // 1-12
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  // Data State
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [transactions, setTransactions] = useState(DEMO_TRANSACTIONS);
  const [budgets, setBudgets] = useState(INITIAL_DEMO_BUDGETS);
  const [isLoading, setIsLoading] = useState(false);

  // Filters State
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'income' | 'expense'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date'); // 'date' | 'amount'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' | 'desc'
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Modals & Dialogs State
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [deletingTransaction, setDeletingTransaction] = useState(null);

  // Toast Notifications State
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Fetch data when live mode is toggled or when active
  const loadLiveData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [txData, budgetData] = await Promise.all([
        transactionService.getAll(),
        budgetService.getAll(),
      ]);
      setTransactions(Array.isArray(txData) ? txData : txData.data || []);
      setBudgets(Array.isArray(budgetData) ? budgetData : budgetData.data || []);
      showToast('Loaded latest live records from MongoDB database', 'success');
    } catch (err) {
      console.warn('Backend server not connected. Falling back to Demo Data mode.', err);
      setIsDemoMode(true);
      showToast('Live backend unreachable. Switched to demo mode.', 'info');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  // Auto-detect backend on mount
  useEffect(() => {
    let isMounted = true;
    const initConnection = async () => {
      setIsLoading(true);
      try {
        const [txData, budgetData] = await Promise.all([
          transactionService.getAll(),
          budgetService.getAll(),
        ]);
        if (isMounted) {
          setTransactions(Array.isArray(txData) ? txData : txData.data || []);
          setBudgets(Array.isArray(budgetData) ? budgetData : budgetData.data || []);
          setIsDemoMode(false);
          showToast('Connected to live MongoDB database', 'success');
        }
      } catch (err) {
        if (isMounted) {
          setIsDemoMode(true);
          setTransactions(DEMO_TRANSACTIONS);
          setBudgets(INITIAL_DEMO_BUDGETS);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    initConnection();
    return () => {
      isMounted = false;
    };
  }, [showToast]);

  // Handle manual toggle of demo mode
  const toggleDemoMode = useCallback((desiredMode) => {
    const newMode = desiredMode !== undefined ? desiredMode : !isDemoMode;
    setIsDemoMode(newMode);
    if (!newMode) {
      loadLiveData();
    } else {
      setTransactions(DEMO_TRANSACTIONS);
      setBudgets(INITIAL_DEMO_BUDGETS);
      showToast('Switched to Demo Data mode', 'info');
    }
  }, [isDemoMode, loadLiveData, showToast]);

  // Transaction CRUD Actions
  const addTransaction = async (formData) => {
    setIsLoading(true);
    try {
      if (isDemoMode) {
        const newTx = {
          ...formData,
          _id: `demo-${Date.now()}`,
          date: formData.date || new Date().toISOString(),
        };
        setTransactions((prev) => [newTx, ...prev]);
        showToast('Transaction added successfully (Demo Mode)', 'success');
      } else {
        const created = await transactionService.create(formData);
        const item = created.data || created;
        setTransactions((prev) => [item, ...prev]);
        showToast('Transaction saved to MongoDB successfully', 'success');
      }
      setIsTransactionModalOpen(false);
    } catch (err) {
      showToast(err.message || 'Failed to create transaction', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const updateTransaction = async (id, formData) => {
    setIsLoading(true);
    try {
      if (isDemoMode) {
        setTransactions((prev) =>
          prev.map((t) => (t._id === id || t.id === id ? { ...t, ...formData } : t))
        );
        showToast('Transaction updated successfully (Demo Mode)', 'success');
      } else {
        const updated = await transactionService.update(id, formData);
        const item = updated.data || updated;
        setTransactions((prev) =>
          prev.map((t) => (t._id === id || t.id === id ? item : t))
        );
        showToast('Transaction updated in MongoDB', 'success');
      }
      setEditingTransaction(null);
      setIsTransactionModalOpen(false);
    } catch (err) {
      showToast(err.message || 'Failed to update transaction', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTransaction = async (id) => {
    setIsLoading(true);
    try {
      if (isDemoMode) {
        setTransactions((prev) => prev.filter((t) => t._id !== id && t.id !== id));
        showToast('Transaction deleted (Demo Mode)', 'success');
      } else {
        await transactionService.delete(id);
        setTransactions((prev) => prev.filter((t) => t._id !== id && t.id !== id));
        showToast('Transaction deleted from MongoDB', 'success');
      }
      setDeletingTransaction(null);
    } catch (err) {
      showToast(err.message || 'Failed to delete transaction', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Budget Actions
  const saveBudget = async (budgetData) => {
    setIsLoading(true);
    try {
      if (isDemoMode) {
        const existingIndex = budgets.findIndex(
          (b) => b.month === budgetData.month && b.year === budgetData.year
        );
        if (existingIndex > -1) {
          const updated = [...budgets];
          updated[existingIndex] = { ...updated[existingIndex], amount: budgetData.amount };
          setBudgets(updated);
        } else {
          setBudgets((prev) => [
            ...prev,
            { _id: `b-demo-${Date.now()}`, ...budgetData },
          ]);
        }
        showToast('Monthly budget updated (Demo Mode)', 'success');
      } else {
        if (budgetData.id) {
          const res = await budgetService.update(budgetData.id, budgetData);
          const item = res.data || res;
          setBudgets((prev) =>
            prev.map((b) => (b._id === budgetData.id ? item : b))
          );
        } else {
          const res = await budgetService.create(budgetData);
          const item = res.data || res;
          setBudgets((prev) => [...prev, item]);
        }
        showToast('Monthly budget saved to MongoDB', 'success');
      }
      setIsBudgetModalOpen(false);
    } catch (err) {
      showToast(err.message || 'Failed to save budget', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const resetFilters = () => {
    setSearch('');
    setFilterType('all');
    setSelectedCategory('all');
    setSortBy('date');
    setSortOrder('desc');
    setStartDate('');
    setEndDate('');
  };

  // Filtered transactions for the Transactions Page
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => {
        // Search filter
        if (search) {
          const query = search.toLowerCase();
          const descMatch = (t.description || '').toLowerCase().includes(query);
          const notesMatch = (t.notes || '').toLowerCase().includes(query);
          if (!descMatch && !notesMatch) return false;
        }

        // Type filter
        if (filterType !== 'all' && t.type !== filterType) {
          return false;
        }

        // Category filter
        if (selectedCategory !== 'all' && t.category !== selectedCategory) {
          return false;
        }

        // Date range filter
        if (startDate) {
          const tDate = new Date(t.date).getTime();
          const sDate = new Date(startDate).getTime();
          if (tDate < sDate) return false;
        }
        if (endDate) {
          const tDate = new Date(t.date).getTime();
          const eDate = new Date(endDate).getTime() + 86400000; // End of selected day
          if (tDate > eDate) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'amount') {
          return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
        }
        // Default sort by date
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
  }, [transactions, search, filterType, selectedCategory, startDate, endDate, sortBy, sortOrder]);

  // Current Month's Transactions & Calculations for Dashboard & Budget
  const currentMonthTransactions = useMemo(() => {
    if (selectedMonth === 0) return transactions; // All months
    return transactions.filter((t) => {
      const d = new Date(t.date);
      return d.getMonth() + 1 === selectedMonth && d.getFullYear() === selectedYear;
    });
  }, [transactions, selectedMonth, selectedYear]);

  // Financial dynamic totals
  const totalIncome = useMemo(() => {
    return currentMonthTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);
  }, [currentMonthTransactions]);

  const totalExpenses = useMemo(() => {
    return currentMonthTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);
  }, [currentMonthTransactions]);

  // Current Active Budget
  const currentBudget = useMemo(() => {
    return (
      budgets.find((b) => b.month === selectedMonth && b.year === selectedYear) ||
      budgets[0] ||
      null
    );
  }, [budgets, selectedMonth, selectedYear]);

  const monthlyBudgetAmount = currentBudget?.amount || 0;

  // Category Expense Distribution for Recharts Pie Chart
  const categoryChartData = useMemo(() => {
    const map = {};
    currentMonthTransactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + Number(t.amount || 0);
      });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [currentMonthTransactions]);

  // Income vs Expense Monthly Trend Data for Recharts Bar Chart
  const monthlyTrendData = useMemo(() => {
    // Generate trend for all 12 months or active year
    const months = Array.from({ length: 12 }, (_, i) => ({
      month: getMonthName(i).slice(0, 3),
      monthNum: i + 1,
      income: 0,
      expense: 0,
    }));

    transactions.forEach((t) => {
      const d = new Date(t.date);
      if (d.getFullYear() === selectedYear) {
        const mIdx = d.getMonth();
        if (t.type === 'income') {
          months[mIdx].income += Number(t.amount || 0);
        } else if (t.type === 'expense') {
          months[mIdx].expense += Number(t.amount || 0);
        }
      }
    });

    return months;
  }, [transactions, selectedYear]);

  const value = {
    activePage,
    setActivePage,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    isDemoMode,
    setIsDemoMode,
    transactions,
    filteredTransactions,
    currentMonthTransactions,
    budgets,
    currentBudget,
    monthlyBudgetAmount,
    totalIncome,
    totalExpenses,
    categoryChartData,
    monthlyTrendData,
    isLoading,
    // Filters
    search,
    setSearch,
    filterType,
    setFilterType,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    resetFilters,
    // Modal controls
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
    loadLiveData,
    toggleDemoMode,
    // Toasts
    toasts,
    showToast,
    dismissToast,
  };

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
};

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};
