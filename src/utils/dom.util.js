/**
 * Move cursor to the end if focused
 * @param {HTMLElement} inputElement
 */
export const moveCursorToEnd = (inputElement) => {
  const selection = window.getSelection();

  if (selection.rangeCount > 0) {
    selection.removeAllRanges();
  }

  const range = document.createRange();

  range.selectNodeContents(inputElement);
  range.collapse(false);

  selection.addRange(range);
};

export default { moveCursorToEnd };
