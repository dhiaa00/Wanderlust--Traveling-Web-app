export const saveToLocalStorage = (name, data) => {
  const newData = JSON.stringify(data);
  window.localStorage.setItem(name, newData);
};

export const getFromLocalStorage = (name) => {
  return window.localStorage.getItem(name);
};
