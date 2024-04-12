export const doubleBracketReplace = (value, replacementMap = {}) => {
  const doubleBracketRegex = /{{(.*?)}}/g;

  return value.replace(doubleBracketRegex, (match, captured) => {
    const sanitizedCaptured = captured.trim();
    return replacementMap[sanitizedCaptured] || match;
  });
};
