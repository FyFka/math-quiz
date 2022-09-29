export const getFromLocalStorage = <T>(key: string): T => {
  return JSON.parse(localStorage.getItem(key) || "0");
};

export const setToLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};
