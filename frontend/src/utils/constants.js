export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
};

export const INCOME_CATEGORIES = [
  'Salary',
  'Freelance',
  'Business',
  'Investments',
  'Other Income',
];

export const EXPENSE_CATEGORIES = [
  'Food',
  'Shopping',
  'Transport',
  'Education',
  'Bills',
  'Entertainment',
  'Healthcare',
  'Other Expenses',
];

export const ALL_CATEGORIES = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];

export const CATEGORY_COLORS = {
  // Income
  Salary: '#10b981',       // Emerald
  Freelance: '#059669',    // Deep Emerald
  Business: '#0d9488',     // Teal
  Investments: '#0284c7',  // Sky
  'Other Income': '#6366f1', // Indigo

  // Expenses
  Food: '#f59e0b',         // Amber
  Shopping: '#ec4899',     // Pink
  Transport: '#3b82f6',    // Blue
  Education: '#8b5cf6',    // Purple
  Bills: '#ef4444',        // Red
  Entertainment: '#14b8a6',// Teal
  Healthcare: '#06b6d4',   // Cyan
  'Other Expenses': '#64748b', // Slate
};

export const DEFAULT_BUDGET_AMOUNT = 3000;
