// 디바운스 리딩 엣지

// 인수로 leading을 true로 준 것이라고 가정
const debounce = (func, wait, leading = false) => {
  let timer; //클로저
  return (e) => {
    // 첫 실행시 -> leading = true인 상태(인자), timer = Undefined 상태이기때문에 callNow는 true로 할당되게 됨
    let callNow = leading && !timer; // timer는 true 가 됨  --> callNow가 실행됨

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
/*
실행 상태 
- callNow 가 true로 할당 
- 타이머가 설정됨 (500ms 작동)
- callNow가 true이므로 첫번째 함수가 실행
- 이벤트 실행
- timer 변수가 할당되었으므로 callNow가 false가 된다
- 타이머가 다시 설정됨
- callNow는 false이기 때문에 함수가 다시 실행되지 않음

* 500ms안에 이벤트가 지속적으로 들어오게되면, 모두 무시를 하게되고 
  마지막 이벤트 실행 후 500ms동안 아무 이벤트도 들어오지 않게 되면, 
  setTimeout에 콜백함수가 실행이 되서 timer가 null로 초기화되고
  다시 callNow가 true가 될 수 있도록 하는 것
*/
