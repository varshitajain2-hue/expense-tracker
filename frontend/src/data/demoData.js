// Generate realistic demo transactions for the current and recent months
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth(); // 0-indexed

// Helper to make an ISO date string in current month
const makeDate = (dayOffset, monthOffset = 0) => {
  const targetDate = new Date(year, month + monthOffset, dayOffset);
  return targetDate.toISOString().split('T')[0];
};

export const INITIAL_DEMO_BUDGETS = [
  {
    _id: 'b-demo-1',
    month: month + 1, // 1-12
    year: year,
    amount: 3200,
  },
];

export const DEMO_TRANSACTIONS = [
  {
    _id: 'demo-1',
    description: 'Tech Corp Monthly Salary',
    amount: 4500,
    type: 'income',
    category: 'Salary',
    date: makeDate(1),
    notes: 'Direct deposit salary for the month',
  },
  {
    _id: 'demo-2',
    description: 'Whole Foods Grocery Market',
    amount: 142.5,
    type: 'expense',
    category: 'Food',
    date: makeDate(2),
    notes: 'Weekly groceries & organic produce',
  },
  {
    _id: 'demo-3',
    description: 'Freelance Web Design Project',
    amount: 850,
    type: 'income',
    category: 'Freelance',
    date: makeDate(3),
    notes: 'Client payment for landing page redesign',
  },
  {
    _id: 'demo-4',
    description: 'Electric & Utility Bill',
    amount: 95.3,
    type: 'expense',
    category: 'Bills',
    date: makeDate(4),
    notes: 'Monthly power and water bill',
  },
  {
    _id: 'demo-5',
    description: 'Metro Subway Transit Card',
    amount: 45,
    type: 'expense',
    category: 'Transport',
    date: makeDate(5),
    notes: 'Monthly commuter recharge',
  },
  {
    _id: 'demo-6',
    description: 'High-Speed Fiber Internet',
    amount: 65,
    type: 'expense',
    category: 'Bills',
    date: makeDate(6),
    notes: 'Internet subscription',
  },
  {
    _id: 'demo-7',
    description: 'Udemy Fullstack Development Course',
    amount: 29.99,
    type: 'expense',
    category: 'Education',
    date: makeDate(7),
    notes: 'Advanced Node.js & React course',
  },
  {
    _id: 'demo-8',
    description: 'Dividend Payout - Index Fund',
    amount: 120.4,
    type: 'income',
    category: 'Investments',
    date: makeDate(8),
    notes: 'Quarterly dividend payment',
  },
  {
    _id: 'demo-9',
    description: 'Dinner with Colleagues',
    amount: 68.5,
    type: 'expense',
    category: 'Food',
    date: makeDate(8),
    notes: 'Italian restaurant dinner',
  },
  {
    _id: 'demo-10',
    description: 'Cinema Movie Tickets & Popcorn',
    amount: 32,
    type: 'expense',
    category: 'Entertainment',
    date: makeDate(9),
    notes: 'Weekend movie outing',
  },
  {
    _id: 'demo-11',
    description: 'Prescription Medicine & Vitamins',
    amount: 48,
    type: 'expense',
    category: 'Healthcare',
    date: makeDate(10),
    notes: 'Pharmacy refill',
  },
  {
    _id: 'demo-12',
    description: 'Amazon Electronics & Desk Lamp',
    amount: 119.99,
    type: 'expense',
    category: 'Shopping',
    date: makeDate(11),
    notes: 'Home office lighting',
  },
  {
    _id: 'demo-13',
    description: 'Online Consulting Session',
    amount: 250,
    type: 'income',
    category: 'Business',
    date: makeDate(12),
    notes: '1-hour tech architecture advisory',
  },
  {
    _id: 'demo-14',
    description: 'Gasoline & Fuel Station',
    amount: 52,
    type: 'expense',
    category: 'Transport',
    date: makeDate(13),
    notes: 'Car tank refill',
  },
  {
    _id: 'demo-15',
    description: 'Cashback & Rewards Bonus',
    amount: 35.2,
    type: 'income',
    category: 'Other Income',
    date: makeDate(14),
    notes: 'Credit card quarterly cashback',
  },
  {
    _id: 'demo-16',
    description: 'Home Hardware & Cleaning Supplies',
    amount: 41.6,
    type: 'expense',
    category: 'Other Expenses',
    date: makeDate(15),
    notes: 'House maintenance items',
  },
];
