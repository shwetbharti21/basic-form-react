export const getValueFromLocalStorage = (key, defaultValue) => {
  const value = localStorage.getItem(key);
  return value || defaultValue;
};
