import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './db.js';
import { Transaction } from '../models/Transaction.js';
import { Budget } from '../models/Budget.js';

dotenv.config();

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth(); // 0-indexed

const makeDate = (day, monthOffset = 0) => {
  return new Date(currentYear, currentMonth + monthOffset, day);
};

const seedTransactions = [
  {
    description: 'Tech Solutions Monthly Salary',
    amount: 5200,
    type: 'income',
    category: 'Salary',
    date: makeDate(1),
    notes: 'Direct deposit payroll',
  },
  {
    description: 'Supermarket Grocery Haul',
    amount: 165.4,
    type: 'expense',
    category: 'Food',
    date: makeDate(2),
    notes: 'Weekly groceries & pantry stock',
  },
  {
    description: 'Freelance Mobile App UI Design',
    amount: 950,
    type: 'income',
    category: 'Freelance',
    date: makeDate(3),
    notes: 'Client milestone payout',
  },
  {
    description: 'City Power & Electric Utility',
    amount: 88.5,
    type: 'expense',
    category: 'Bills',
    date: makeDate(4),
    notes: 'Monthly power and heating bill',
  },
  {
    description: 'Public Transportation Pass',
    amount: 50,
    type: 'expense',
    category: 'Transport',
    date: makeDate(5),
    notes: 'Bus and metro monthly pass',
  },
  {
    description: 'Broadband Fiber Internet',
    amount: 60,
    type: 'expense',
    category: 'Bills',
    date: makeDate(6),
    notes: 'High speed fiber connection',
  },
  {
    description: 'Online Learning Platform Subscription',
    amount: 35,
    type: 'expense',
    category: 'Education',
    date: makeDate(7),
    notes: 'Fullstack development tutorials',
  },
  {
    description: 'Quarterly Mutual Fund Dividend',
    amount: 145.8,
    type: 'income',
    category: 'Investments',
    date: makeDate(8),
    notes: 'Index fund reinvestment dividend',
  },
  {
    description: 'Weekend Dining with Family',
    amount: 78.2,
    type: 'expense',
    category: 'Food',
    date: makeDate(8),
    notes: 'Local restaurant meal',
  },
  {
    description: 'Movie Theater & Refreshments',
    amount: 34,
    type: 'expense',
    category: 'Entertainment',
    date: makeDate(9),
    notes: 'Weekend cinema outing',
  },
  {
    description: 'Doctor Consultation & Medicine',
    amount: 65,
    type: 'expense',
    category: 'Healthcare',
    date: makeDate(10),
    notes: 'Annual medical wellness checkup',
  },
  {
    description: 'New Mechanical Keyboard & Mouse',
    amount: 129.99,
    type: 'expense',
    category: 'Shopping',
    date: makeDate(11),
    notes: 'Home workspace upgrade',
  },
];

const seedBudgets = [
  {
    month: currentMonth + 1,
    year: currentYear,
    amount: 3500,
    category: 'General',
  },
];

const seedData = async () => {
  try {
    await connectDB();

    console.log('[Seeder] Clearing old records...');
    await Transaction.deleteMany({});
    await Budget.deleteMany({});

    console.log('[Seeder] Inserting seed transactions...');
    await Transaction.insertMany(seedTransactions);

    console.log('[Seeder] Inserting seed budget...');
    await Budget.insertMany(seedBudgets);

    console.log('✅ [Seeder] Database successfully populated with realistic transactions & budget!');
    process.exit(0);
  } catch (error) {
    console.error('❌ [Seeder] Error during database seeding:', error.message);
    process.exit(1);
  }
};

seedData();
