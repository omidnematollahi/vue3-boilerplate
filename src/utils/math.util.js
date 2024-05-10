/**
 * Clamp value between 0 and maxValue
 * @param {number} value
 * @param {number} maxValue
 * @returns {number} - clamped value
 */
export const clamp = (value, maxValue) => {
  return Math.min(Math.max(0, value), maxValue);
};

export default { clamp };
