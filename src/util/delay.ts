export const delay = (callback: () => void, timeout = 1000) => {
  setTimeout(callback, timeout);
};
