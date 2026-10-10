import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema(
  {
    month: {
      type: Number,
      required: [true, 'Budget month is required (1-12)'],
      min: [1, 'Month must be between 1 and 12'],
      max: [12, 'Month must be between 1 and 12'],
    },
    year: {
      type: Number,
      required: [true, 'Budget year is required'],
      min: [2000, 'Year must be 2000 or later'],
      max: [2100, 'Year cannot exceed 2100'],
    },
    amount: {
      type: Number,
      required: [true, 'Monthly spending limit amount is required'],
      min: [1, 'Budget limit must be at least $1'],
    },
    category: {
      type: String,
      trim: true,
      default: 'General',
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure uniqueness per month + year + category
budgetSchema.index({ month: 1, year: 1, category: 1 }, { unique: true });

export const Budget = mongoose.model('Budget', budgetSchema);
