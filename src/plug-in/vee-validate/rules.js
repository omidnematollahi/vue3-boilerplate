const required = (value) => {
  if (!value || !value.length) {
    return false;
  }

  return true;
};

const betweenLength = (value, [min, max]) => {
  if (!value || !value.length) {
    return true;
  }

  if (value.length < min || value.length > max) {
    return false;
  }

  return true;
};

export default { required, betweenLength };
