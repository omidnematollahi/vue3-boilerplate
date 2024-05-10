/**
 * Check if the given entry is object and it's empty
 * @param {Object} entry
 * @returns {boolean} - entry emptiness
 */
export const isObjectEmpty = (entry) => {
  if (!entry) return false;

  const isObject = entry?.constructor === Object;
  if (!isObject) return false;

  const isEmpty = Object.keys(entry).length === 0;
  return isEmpty;
};

export default {
  isEmpty: isObjectEmpty,
};
