'use strict';
function debounce(func, wait = 500, immediate = false) {
  let timer;

  const debounced = (...args) =>
    new Promise((resolve, reject) => {
      if (immediate) {
        resolve(func(...args));
      }
      if (timer) {
        clearTimeout(timer);
        timer = null;
        resolve(null);
      }
      timer = setTimeout(() => {
        try {
          const result = func(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, wait);
    });

  const cancel = () => {
    if (timer) clearTimeout(timer);
    timer = null;
  };
  return { debounced, cancel };
}
