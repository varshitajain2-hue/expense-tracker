import api from './api';

export const transactionService = {
  /**
   * Fetch transactions with optional filter query parameters
   * @param {object} params - { type, category, startDate, endDate, search, sort, order }
   */
  async getAll(params = {}) {
    const response = await api.get('/transactions', { params });
    return response.data;
  },

  /**
   * Fetch single transaction by ID
   * @param {string} id
   */
  async getById(id) {
    const response = await api.get(`/transactions/${id}`);
    return response.data;
  },

  /**
   * Create new transaction
   * @param {object} transactionData
   */
  async create(transactionData) {
    const response = await api.post('/transactions', transactionData);
    return response.data;
  },

  /**
   * Update existing transaction
   * @param {string} id
   * @param {object} transactionData
   */
  async update(id, transactionData) {
    const response = await api.put(`/transactions/${id}`, transactionData);
    return response.data;
  },

  /**
   * Delete transaction
   * @param {string} id
   */
  async delete(id) {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  },
};
