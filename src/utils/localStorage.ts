export const getFromLocalStorage = <T>(key: string): T => {
  return JSON.parse(localStorage.getItem(key) || "1");
};

export const setToLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};
