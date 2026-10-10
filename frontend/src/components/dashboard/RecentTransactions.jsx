import React from 'react';
import { ArrowUpRight, ArrowDownRight, ExternalLink } from 'lucide-react';
import { Badge } from '../common/Badge';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const RecentTransactions = ({ transactions = [], onNavigateToAll, onEdit }) => {
  const recent = transactions.slice(0, 5);

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">Recent Transactions</h3>
          <p className="card-subtitle">Latest account activities</p>
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={onNavigateToAll}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
        >
          <span>View All</span>
          <ExternalLink size={13} />
        </button>
      </div>

      {recent.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '32px 16px', color: 'var(--text-muted)' }}>
          No transactions recorded yet.
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th style={{ textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((tx) => {
                const isIncome = tx.type === 'income';
                return (
                  <tr
                    key={tx._id || tx.id}
                    onClick={() => onEdit && onEdit(tx)}
                    style={{ cursor: onEdit ? 'pointer' : 'default' }}
                    title="Click to view/edit"
                  >
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                      {formatDate(tx.date)}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            backgroundColor: isIncome ? 'var(--income-bg)' : 'var(--expense-bg)',
                            color: isIncome ? 'var(--income-color)' : 'var(--expense-color)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          {isIncome ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                        </div>
                        <span style={{ fontWeight: 500, color: 'var(--text-main)' }}>
                          {tx.description}
                        </span>
                      </div>
                    </td>
                    <td>
                      <Badge category={tx.category} />
                    </td>
                    <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <span
                        style={{
                          fontWeight: 600,
                          color: isIncome ? 'var(--primary-600)' : 'var(--expense-color)',
                        }}
                      >
                        {isIncome ? '+' : '-'}{formatCurrency(tx.amount)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
