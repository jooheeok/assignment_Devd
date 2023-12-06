const debounceFirst = (func, wait = 500, immediate = false) => {
  let timer;
  const debounced = (...args) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      return;
    }
    if (immediate) return func(args);
    timer = setTimeout(() => {
      func(args);
    }, wait);

    debounced.cancel = () => {
      clearTimeout(timer);
    };
  };
  return debounced;
};

function debounceSecond(func, wait = 500, immediate = false) {
  let timer;
  const debounced = (...args) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      return;
    }

    if (immediate) return func(args);

    timer = setTimeout(() => {
      func(args);
    }, wait);
  };

  cancel = () => {
    clearTimeout(timer);
    timer = null;
  };

  return { debounced, cancel };
}

function debouncePromise(func, wait = 500, immediate = false) {
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
    clearTimeout(timer);
    timer = null;
  };

  return { debounced, cancel };
}
