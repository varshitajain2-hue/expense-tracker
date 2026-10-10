import { Budget } from '../models/Budget.js';

/**
 * @desc    Get all budgets or filter by month & year
 * @route   GET /api/budgets
 * @access  Public
 */
export const getBudgets = async (req, res, next) => {
  try {
    const { month, year } = req.query;
    const query = {};

    if (month) query.month = parseInt(month, 10);
    if (year) query.year = parseInt(year, 10);

    const budgets = await Budget.find(query).sort({ year: -1, month: -1 });

    res.status(200).json({
      success: true,
      count: budgets.length,
      data: budgets,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new budget limit (or upsert if exists for same month & year)
 * @route   POST /api/budgets
 * @access  Public
 */
export const createBudget = async (req, res, next) => {
  try {
    const { month, year, amount, category = 'General' } = req.body;

    if (!month || month < 1 || month > 12) {
      return res.status(400).json({
        success: false,
        message: 'Month is required and must be between 1 and 12',
      });
    }

    if (!year || year < 2000) {
      return res.status(400).json({
        success: false,
        message: 'Valid year is required (e.g. 2026)',
      });
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Budget amount must be a positive number greater than 0',
      });
    }

    // Upsert budget if already exists for this month & year
    const filter = { month: parseInt(month, 10), year: parseInt(year, 10), category };
    const update = { amount: numAmount };
    const options = { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true };

    const budget = await Budget.findOneAndUpdate(filter, update, options);

    res.status(201).json({
      success: true,
      data: budget,
      message: 'Budget limit configured successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update budget by ID
 * @route   PUT /api/budgets/:id
 * @access  Public
 */
export const updateBudget = async (req, res, next) => {
  try {
    const { amount, month, year, category } = req.body;

    const updates = {};
    if (amount !== undefined) {
      const numAmount = parseFloat(amount);
      if (isNaN(numAmount) || numAmount <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Budget amount must be greater than 0',
        });
      }
      updates.amount = numAmount;
    }

    if (month !== undefined) updates.month = parseInt(month, 10);
    if (year !== undefined) updates.year = parseInt(year, 10);
    if (category !== undefined) updates.category = category;

    const budget = await Budget.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: `Budget not found with id: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: budget,
      message: 'Budget updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete budget by ID
 * @route   DELETE /api/budgets/:id
 * @access  Public
 */
export const deleteBudget = async (req, res, next) => {
  try {
    const budget = await Budget.findByIdAndDelete(req.params.id);

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: `Budget not found with id: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: {},
      message: 'Budget removed successfully',
    });
  } catch (error) {
    next(error);
  }
};
