"use strict";
function debounce(func, wait = 500, immediate = false) {
    let timer;
    const debounced = (...args) => new Promise((resolve, reject) => {
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
            }
            catch (error) {
                reject(error);
            }
        }, wait);
    });
    // ✅ debounce 함수에 의해 생성된 타이머를 취소하는 'cancel 메소드'를 제공합니다.
    const cancel = () => {
        if (timer)
            clearTimeout(timer);
        timer = null;
    };
    return { debounced, cancel };
}
