/**
 * Clamp value between min and max values
 * @param {number} value
 * @param {Object} options
 * @param {number} [options.min=0]
 * @param {number} options.max
 * @returns {number} - clamped value
 */
export const clamp = (value, { max, min = 0 }) => {
  return Math.min(Math.max(min, value), max);
};

export default { clamp };
