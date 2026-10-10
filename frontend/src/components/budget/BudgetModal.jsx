import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { getMonthName } from '../../utils/formatters';

export const BudgetModal = ({
  isOpen,
  onClose,
  onSubmit,
  currentBudget = null,
  activeMonth,
  activeYear,
  isLoading = false,
}) => {
  const [amount, setAmount] = useState('');
  const [month, setMonth] = useState(activeMonth || new Date().getMonth() + 1);
  const [year, setYear] = useState(activeYear || new Date().getFullYear());
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentBudget) {
      setAmount(currentBudget.amount ? String(currentBudget.amount) : '');
      setMonth(currentBudget.month || activeMonth || new Date().getMonth() + 1);
      setYear(currentBudget.year || activeYear || new Date().getFullYear());
    } else {
      setAmount('');
      setMonth(activeMonth || new Date().getMonth() + 1);
      setYear(activeYear || new Date().getFullYear());
    }
    setError('');
  }, [currentBudget, activeMonth, activeYear, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (!amount || isNaN(num) || num <= 0) {
      setError('Please enter a valid budget amount greater than $0');
      return;
    }

    onSubmit({
      amount: num,
      month: Number(month),
      year: Number(year),
      id: currentBudget?._id || currentBudget?.id,
    });
  };

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: getMonthName(i),
  }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={currentBudget ? 'Edit Monthly Budget' : 'Set Monthly Budget'}
      maxWidth="440px"
    >
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
            {/* Month */}
            <div className="form-group">
              <label className="form-label">Target Month</label>
              <select
                className="form-control"
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
              >
                {months.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Year */}
            <div className="form-group">
              <label className="form-label">Target Year</label>
              <select
                className="form-control"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              >
                {[year - 1, year, year + 1, year + 2].map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Amount */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">
              Monthly Spending Limit ($) <span className="required">*</span>
            </label>
            <input
              type="number"
              step="10"
              min="1"
              placeholder="e.g. 3500"
              className={`form-control ${error ? 'error' : ''}`}
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if (error) setError('');
              }}
              autoFocus
            />
            {error && <div className="form-error">{error}</div>}
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
              Your dashboard will alert you when expenses approach this limit.
            </span>
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
            {isLoading ? 'Saving...' : 'Save Budget'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
