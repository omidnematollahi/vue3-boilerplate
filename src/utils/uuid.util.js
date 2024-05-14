export const generateUUID = () => {
  const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

  return pattern.replace(/[xy]/g, (placeholder) => {
    const randomValue = (Math.random() * 16) | 0;
    const value = placeholder === 'x' ? randomValue : (randomValue & 0x3) | 0x8;

    return value.toString(16);
  });
};

export default {
  generate: generateUUID,
};
