export const saveToLocalStorage = (name, data) => {
  const newData = JSON.stringify(data);
  window.localStorage.setItem("user", newData);
};

export const getFromLocalStorage = (name) => {
  return window.localStorage.getItem("user");
};
