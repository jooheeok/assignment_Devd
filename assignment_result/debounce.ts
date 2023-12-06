function debounce<T extends unknown[]>(func: (...args: T) => void, wait = 500, immediate = false) {
  let timer: ReturnType<typeof setTimeout> | null;

  const debounced = (...args: T) =>
    new Promise((resolve, reject) => {
      if (immediate) {
        resolve(func(...args));
        return;
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
