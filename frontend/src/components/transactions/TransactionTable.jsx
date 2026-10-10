import React from 'react';
import { Edit2, Trash2, ArrowUpRight, ArrowDownRight, FileText } from 'lucide-react';
import { Badge } from '../common/Badge';
import { EmptyState } from '../common/EmptyState';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const TransactionTable = ({
  transactions = [],
  onEdit,
  onDelete,
  onOpenAddModal,
}) => {
  if (transactions.length === 0) {
    return (
      <div className="card">
        <EmptyState
          title="No transactions found"
          description="Try adjusting your filters, searching for a different keyword, or add a new transaction."
          actionText="+ Add Transaction"
          onAction={onOpenAddModal}
        />
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
              <th style={{ textAlign: 'center', width: '90px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => {
              const isIncome = tx.type === 'income';
              const id = tx._id || tx.id;

              return (
                <tr key={id}>
                  {/* Type Icon */}
                  <td style={{ width: '48px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: isIncome ? 'var(--income-bg)' : 'var(--expense-bg)',
                        color: isIncome ? 'var(--income-color)' : 'var(--expense-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      title={isIncome ? 'Income' : 'Expense'}
                    >
                      {isIncome ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                    </div>
                  </td>

                  {/* Date */}
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.84rem', whiteSpace: 'nowrap' }}>
                    {formatDate(tx.date)}
                  </td>

                  {/* Description & Note */}
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>
                      {tx.description}
                    </div>
                    {tx.notes && (
                      <div
                        style={{
                          fontSize: '0.78rem',
                          color: 'var(--text-muted)',
                          marginTop: '2px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <FileText size={12} />
                        <span>{tx.notes}</span>
                      </div>
                    )}
                  </td>

                  {/* Category */}
                  <td>
                    <Badge category={tx.category} />
                  </td>

                  {/* Amount */}
                  <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <span
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        color: isIncome ? 'var(--primary-600)' : 'var(--expense-color)',
                      }}
                    >
                      {isIncome ? '+' : '-'}{formatCurrency(tx.amount)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      <button
                        type="button"
                        className="btn-icon"
                        onClick={() => onEdit(tx)}
                        title="Edit transaction"
                        aria-label="Edit transaction"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        type="button"
                        className="btn-icon"
                        onClick={() => onDelete(tx)}
                        title="Delete transaction"
                        aria-label="Delete transaction"
                        style={{ color: '#ef4444' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
