/**
 * Formats a number to Pakistani Rupees currency string
 * @param {number|string} amount 
 * @returns {string} e.g. "Rs. 85,000"
 */
export const formatPKR = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return 'Rs. 0';
  return `Rs. ${Number(amount).toLocaleString('en-PK')}`;
};

/**
 * Calculates discount percentage
 * @param {number} price 
 * @param {number} oldPrice 
 * @returns {number} e.g. 12 (%)
 */
export const calculateDiscount = (price, oldPrice) => {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
};

/**
 * Formats dates to human readable string
 * @param {string} dateString 
 * @returns {string} e.g. "Aug 15, 2026"
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};
