import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import {
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES,
  TRANSACTION_TYPES,
} from '../../utils/constants';
import { formatDateForInput } from '../../utils/formatters';

export const TransactionModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    type: TRANSACTION_TYPES.EXPENSE,
    amount: '',
    category: EXPENSE_CATEGORIES[0],
    description: '',
    date: formatDateForInput(new Date()),
    notes: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        type: initialData.type || TRANSACTION_TYPES.EXPENSE,
        amount: initialData.amount ? String(initialData.amount) : '',
        category: initialData.category || (initialData.type === 'income' ? INCOME_CATEGORIES[0] : EXPENSE_CATEGORIES[0]),
        description: initialData.description || '',
        date: formatDateForInput(initialData.date || new Date()),
        notes: initialData.notes || '',
      });
    } else {
      setFormData({
        type: TRANSACTION_TYPES.EXPENSE,
        amount: '',
        category: EXPENSE_CATEGORIES[0],
        description: '',
        date: formatDateForInput(new Date()),
        notes: '',
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  // Handle type change and auto-adjust default category
  const handleTypeChange = (newType) => {
    const defaultCat = newType === TRANSACTION_TYPES.INCOME ? INCOME_CATEGORIES[0] : EXPENSE_CATEGORIES[0];
    setFormData((prev) => ({
      ...prev,
      type: newType,
      category: defaultCat,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    const numAmount = parseFloat(formData.amount);
    if (!formData.amount || isNaN(numAmount) || numAmount <= 0) {
      newErrors.amount = 'Amount must be a positive number greater than 0';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount),
    });
  };

  const availableCategories =
    formData.type === TRANSACTION_TYPES.INCOME ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Transaction' : 'Add New Transaction'}
    >
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          {/* Income / Expense Toggle */}
          <div className="form-group">
            <label className="form-label">Transaction Type</label>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                padding: '4px',
                backgroundColor: 'var(--bg-surface-subtle)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <button
                type="button"
                className={`btn btn-sm ${
                  formData.type === TRANSACTION_TYPES.EXPENSE ? 'btn-danger' : 'btn-secondary'
                }`}
                style={{
                  border: 'none',
                  backgroundColor:
                    formData.type === TRANSACTION_TYPES.EXPENSE ? '#ef4444' : 'transparent',
                  color: formData.type === TRANSACTION_TYPES.EXPENSE ? '#fff' : 'var(--text-muted)',
                  fontWeight: 600,
                }}
                onClick={() => handleTypeChange(TRANSACTION_TYPES.EXPENSE)}
              >
                Expense
              </button>
              <button
                type="button"
                className={`btn btn-sm ${
                  formData.type === TRANSACTION_TYPES.INCOME ? 'btn-primary' : 'btn-secondary'
                }`}
                style={{
                  border: 'none',
                  backgroundColor:
                    formData.type === TRANSACTION_TYPES.INCOME ? '#10b981' : 'transparent',
                  color: formData.type === TRANSACTION_TYPES.INCOME ? '#fff' : 'var(--text-muted)',
                  fontWeight: 600,
                }}
                onClick={() => handleTypeChange(TRANSACTION_TYPES.INCOME)}
              >
                Income
              </button>
            </div>
          </div>

          {/* Amount */}
          <div className="form-group">
            <label className="form-label">
              Amount ($) <span className="required">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              className={`form-control ${errors.amount ? 'error' : ''}`}
              value={formData.amount}
              onChange={(e) => {
                setFormData({ ...formData, amount: e.target.value });
                if (errors.amount) setErrors({ ...errors, amount: null });
              }}
            />
            {errors.amount && <div className="form-error">{errors.amount}</div>}
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">
              Description <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Grocery store, Monthly salary, Netflix"
              className={`form-control ${errors.description ? 'error' : ''}`}
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                if (errors.description) setErrors({ ...errors, description: null });
              }}
            />
            {errors.description && <div className="form-error">{errors.description}</div>}
          </div>

          {/* Category Dropdown */}
          <div className="form-group">
            <label className="form-label">
              Category <span className="required">*</span>
            </label>
            <select
              className={`form-control ${errors.category ? 'error' : ''}`}
              value={formData.category}
              onChange={(e) => {
                setFormData({ ...formData, category: e.target.value });
                if (errors.category) setErrors({ ...errors, category: null });
              }}
            >
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <div className="form-error">{errors.category}</div>}
          </div>

          {/* Date */}
          <div className="form-group">
            <label className="form-label">
              Date <span className="required">*</span>
            </label>
            <input
              type="date"
              className={`form-control ${errors.date ? 'error' : ''}`}
              value={formData.date}
              onChange={(e) => {
                setFormData({ ...formData, date: e.target.value });
                if (errors.date) setErrors({ ...errors, date: null });
              }}
            />
            {errors.date && <div className="form-error">{errors.date}</div>}
          </div>

          {/* Notes (Optional) */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Notes (Optional)</label>
            <textarea
              rows={2}
              placeholder="Add optional notes or receipt reference..."
              className="form-control"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Saving...' : initialData ? 'Update Transaction' : 'Save Transaction'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
