import mongoose from 'mongoose';

export const VALID_CATEGORIES = [
  // Income categories
  'Salary',
  'Freelance',
  'Business',
  'Investments',
  'Other Income',
  // Expense categories
  'Food',
  'Shopping',
  'Transport',
  'Education',
  'Bills',
  'Entertainment',
  'Healthcare',
  'Other Expenses',
];

const transactionSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, 'Transaction description is required'],
      trim: true,
      maxlength: [150, 'Description cannot exceed 150 characters'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0.01, 'Amount must be greater than 0'],
    },
    type: {
      type: String,
      required: [true, 'Transaction type is required'],
      enum: {
        values: ['income', 'expense'],
        message: '{VALUE} is not a valid transaction type (must be income or expense)',
      },
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: VALID_CATEGORIES,
        message: '{VALUE} is not a recognized category',
      },
    },
    date: {
      type: Date,
      required: [true, 'Transaction date is required'],
      default: Date.now,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for fast queries
transactionSchema.index({ date: -1 });
transactionSchema.index({ type: 1 });
transactionSchema.index({ category: 1 });

export const Transaction = mongoose.model('Transaction', transactionSchema);
