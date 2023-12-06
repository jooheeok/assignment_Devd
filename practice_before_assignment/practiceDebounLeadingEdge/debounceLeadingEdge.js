// 디바운스 리딩 엣지
const debounce = (func, wait, leading = false) => {
  let timer; //클로저
  return (e) => {
    let callNow = leading && !timer;

    const later = () => {
      timer = null;
      if (!leading) {
        func();
      }
    };

    clearTimeout(timer);
    timer = setTimeout(later, wait);

    if (callNow) {
      func(e);
    }
  };
};
// 예제로 사용할 함수 정의
const sampleFunction = (event) => {
  console.log(`Function called with event:`, event);
};

const debouncedFunction = debounce(sampleFunction, 500, true);

debouncedFunction('Event 1');
debouncedFunction('Event 2');
debouncedFunction('Event 3');

setTimeout(() => {
  debouncedFunction('Event 4');
}, 1000);
