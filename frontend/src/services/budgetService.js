import api from './api';

export const budgetService = {
  /**
   * Fetch budgets with optional month and year filters
   * @param {object} params - { month, year }
   */
  async getAll(params = {}) {
    const response = await api.get('/budgets', { params });
    return response.data;
  },

  /**
   * Create new budget limit
   * @param {object} budgetData - { month, year, amount, category }
   */
  async create(budgetData) {
    const response = await api.post('/budgets', budgetData);
    return response.data;
  },

  /**
   * Update existing budget
   * @param {string} id
   * @param {object} budgetData
   */
  async update(id, budgetData) {
    const response = await api.put(`/budgets/${id}`, budgetData);
    return response.data;
  },

  /**
   * Delete budget
   * @param {string} id
   */
  async delete(id) {
    const response = await api.delete(`/budgets/${id}`);
    return response.data;
  },
};
