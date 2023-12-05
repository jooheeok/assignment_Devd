// ! START key event area ----------------------------
const $input = document.querySelector('#input');
const $submitBtn = document.querySelector('#submitBtn');
const $result = document.querySelector('#result');

// input val (typing)
$input.addEventListener('input', (e) => {
  debouncedFn(e.target.value);
});

// "esc" key down -> ✅ cancel 메소드가 실행
$input.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    debouncedFn.cancel();
  }
});
// ! "esc" key down -> ✅ cancel 메소드가 실행
// $input.addEventListener('keydown', (e) => {
//   if (e.key === 'enter') {
//     // debouncedFn.cancel();
//   }
// });
// 전송 버튼을 직접 클릭한 경우의 제어
$submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  debouncedFn($input.value);
  console.log('inpurt val', $input.value);
});

// 여기에서 userInput을 처리하는 로직을 추가합니다.
const handleTyping = (userInput) => {
  // console.log('User input >>>', userInput);
  // $result.insertAdjacentHTML('beforeend', $input.value);
  $result.insertAdjacentHTML('beforeend', userInput);
  $input.value = '';
  // $result.insertAdjacentHTML('beforeend', '<p>끝에 추가</p>');
};

// ! ----------------------------------- key event area END

const debounce = (func, wait = 500, immediate = false) => {
  let timer;
  // ! ev가 발생하면 -> debounced가 호출됨 / 입력된 ev들이 args에 들어가고
  const debounced = (...args) => {
    // if (immediate) return func(args); // ❌
    if (timer) {
      clearTimeout(timer);
      timer = null;
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
// ✅ immediate : false옵션
// const debouncedFn = debounce(handleTyping, 1000, false);
// const debouncedFn = debounce(handleTyping);
// ✅ immediate : true옵션
const debouncedFn = debounce(handleTyping); //  즉시실행이면 debounce 해제하는 건가..?
