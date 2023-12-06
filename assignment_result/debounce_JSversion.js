const debounceFirst = (func, wait = 500, immediate = false) => {
  let timer;
  const debounced = (...args) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      return;
    }
    // ✅ 2. 즉시 실행하는 옵션(immediate)을 지원합니다.  -> debounced를 무력화한다는 뜻이겠지? 지연 없이 즉시실행?
    if (immediate) return func(args);
    // ✅ 1. 대기 시간(wait)이 경과한 후에만 원래 함수(func)를 실행합니다.
    timer = setTimeout(() => {
      func(args);
    }, wait);

    // ✅ 3. debounce 함수에 의해 생성된 타이머를 취소하는 'cancel 메소드'를 제공합니다.
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

    // ✅ 2. 즉시 실행하는 옵션(immediate)을 지원합니다.  -> debounced를 무력화한다는 뜻이겠지? 지연 없이 즉시실행?
    if (immediate) return func(args);

    // ✅ 1. 대기 시간(wait)이 경과한 후에만 원래 함수(func)를 실행합니다.
    timer = setTimeout(() => {
      func(args);
    }, wait);
  };

  // ✅ 3. debounce 함수에 의해 생성된 타이머를 취소하는 'cancel 메소드'를 제공합니다.
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

  // ✅ debounce 함수에 의해 생성된 타이머를 취소하는 'cancel 메소드'를 제공합니다.
  const cancel = () => {
    clearTimeout(timer);
    timer = null;
  };

  return { debounced, cancel };
}
