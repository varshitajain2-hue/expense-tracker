import { Transaction, VALID_CATEGORIES } from '../models/Transaction.js';

/**
 * @desc    Get all transactions with optional filters, search, and sorting
 * @route   GET /api/transactions
 * @access  Public
 */
export const getTransactions = async (req, res, next) => {
  try {
    const { type, category, startDate, endDate, search, sort = 'date', order = 'desc', month, year } = req.query;

    const query = {};

    // Filter by transaction type (income / expense)
    if (type && ['income', 'expense'].includes(type)) {
      query.type = type;
    }

    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }

    // Filter by Date range
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        query.date.$lte = end;
      }
    }

    // Filter by Month and Year if provided
    if (month && year) {
      const m = parseInt(month, 10);
      const y = parseInt(year, 10);
      const startOfMonth = new Date(y, m - 1, 1);
      const endOfMonth = new Date(y, m, 0, 23, 59, 59, 999);
      query.date = { $gte: startOfMonth, $lte: endOfMonth };
    }

    // Search by description or notes
    if (search) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [{ description: searchRegex }, { notes: searchRegex }];
    }

    // Determine sort
    const sortField = sort === 'amount' ? 'amount' : 'date';
    const sortDirection = order === 'asc' ? 1 : -1;

    const transactions = await Transaction.find(query).sort({ [sortField]: sortDirection });

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single transaction by ID
 * @route   GET /api/transactions/:id
 * @access  Public
 */
export const getTransactionById = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: `Transaction not found with id: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new transaction
 * @route   POST /api/transactions
 * @access  Public
 */
export const createTransaction = async (req, res, next) => {
  try {
    const { description, amount, type, category, date, notes } = req.body;

    // Explicit validation checks
    if (!description || !description.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Description is required and cannot be empty',
      });
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be a positive number greater than 0',
      });
    }

    if (!type || !['income', 'expense'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Type must be either "income" or "expense"',
      });
    }

    if (!category || !VALID_CATEGORIES.includes(category)) {
      return res.status(400).json({
        success: false,
        message: `Invalid category: "${category}". Please choose a valid category.`,
      });
    }

    const transaction = await Transaction.create({
      description: description.trim(),
      amount: numAmount,
      type,
      category,
      date: date ? new Date(date) : new Date(),
      notes: notes ? notes.trim() : '',
    });

    res.status(201).json({
      success: true,
      data: transaction,
      message: 'Transaction recorded successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update existing transaction
 * @route   PUT /api/transactions/:id
 * @access  Public
 */
export const updateTransaction = async (req, res, next) => {
  try {
    const { description, amount, type, category, date, notes } = req.body;

    const updates = {};
    if (description !== undefined) {
      if (!description.trim()) {
        return res.status(400).json({ success: false, message: 'Description cannot be empty' });
      }
      updates.description = description.trim();
    }

    if (amount !== undefined) {
      const numAmount = parseFloat(amount);
      if (isNaN(numAmount) || numAmount <= 0) {
        return res.status(400).json({ success: false, message: 'Amount must be greater than 0' });
      }
      updates.amount = numAmount;
    }

    if (type !== undefined) {
      if (!['income', 'expense'].includes(type)) {
        return res.status(400).json({ success: false, message: 'Type must be "income" or "expense"' });
      }
      updates.type = type;
    }

    if (category !== undefined) {
      if (!VALID_CATEGORIES.includes(category)) {
        return res.status(400).json({ success: false, message: `Invalid category: ${category}` });
      }
      updates.category = category;
    }

    if (date !== undefined) updates.date = new Date(date);
    if (notes !== undefined) updates.notes = notes.trim();

    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: `Transaction not found with id: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: transaction,
      message: 'Transaction updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete transaction
 * @route   DELETE /api/transactions/:id
 * @access  Public
 */
export const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: `Transaction not found with id: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: {},
      message: 'Transaction deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
