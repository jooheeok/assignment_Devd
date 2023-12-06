function debounce<T extends unknown[]>(func: (...args: T) => void, wait = 500, immediate = false) {
  let timer: ReturnType<typeof setTimeout> | null;

  const debounced = (...args: T) =>
    new Promise((resolve, reject) => {
      if (immediate) {
        resolve(func(...args));
        return; // resolve 실행한 이후에 계속되는 것을 방지하고자 추가 - Promise실행 이후 즉시 종료!
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

  // ✅ debounce 함수에 의해 생성된 타이머를 취소하는 'cancel 메소드'를 제공합니다.
  const cancel = () => {
    if (timer) clearTimeout(timer);
    timer = null;
  };

  return { debounced, cancel };
}