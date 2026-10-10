/**
 * Format number as currency (defaults to USD $)
 * @param {number} amount
 * @param {string} currency
 * @returns {string}
 */
export const formatCurrency = (amount, currency = 'USD') => {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '$0.00';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format ISO date string or Date object to readable date
 * @param {string|Date} date
 * @param {object} options
 * @returns {string}
 */
export const formatDate = (date, options = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('en-US', options).format(d);
};

/**
 * Format date for HTML input type="date" (YYYY-MM-DD)
 * @param {string|Date} date
 * @returns {string}
 */
export const formatDateForInput = (date) => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  return d.toISOString().split('T')[0];
};

/**
 * Format number as percentage
 * @param {number} value
 * @param {number} decimals
 * @returns {string}
 */
export const formatPercentage = (value, decimals = 1) => {
  if (value === undefined || value === null || isNaN(value)) return '0%';
  return `${value.toFixed(decimals)}%`;
};

/**
 * Get Month name from index (0-11) or ISO string
 * @param {number|string} monthIndexOrDate
 * @returns {string}
 */
export const getMonthName = (monthIndexOrDate) => {
  if (typeof monthIndexOrDate === 'number') {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthIndexOrDate] || '';
  }
  const d = new Date(monthIndexOrDate);
  return d.toLocaleString('default', { month: 'long' });
};
