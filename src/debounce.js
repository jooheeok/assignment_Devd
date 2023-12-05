/*
! 조건
    1. 대기 시간(wait)이 경과한 후에만 원래 함수(func)를 실행합니다.
    2. 첫 번째 함수 호출을 즉시 실행하는 옵션(immediate)을 지원합니다. 
       ? enter key 입력이나 submit btn을 클릭하는 경우
    3. debounce 함수에 의해 생성된 타이머를 취소하는 cancel 메소드를 제공합니다.
       ? wait로 넣어준 값 이전에 다시 호출이 온다면 --> cancel fn()
    4. debounce 함수가 프로미스를 반환하며, 원래 함수의 실행이 완료될 때 프로미스가 해결되도록 합니다.
       ? 
*/
// ! START key event area ----------------------------
const $input = document.querySelector('#input');
const $submitBtn = document.querySelector('#submitBtn');

// key 입력값에 대한 전달
$input.addEventListener('input', (e) => {
  // handleTyping(e.target.value); // 타이핑 값
  debouncedFn(e.target.value); // 얘가 계속 setTimer를 reset해줄것
});

// key down ev에 대한 전달
//? --> keyDown이 일어나면 immediate가 true가 될 수 있도록 하고싶음
$input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    // e.preventDefault(); //  form을 전달해줌
    // handleTyping($input.value);
    debouncedFn('enter key');
    // debouncedFn($input.value);
  }
});
// ! 끝내고 싶은 것
// 전송 버튼을 직접 클릭한 경우의 제어
$submitBtn.addEventListener('click', (e) => {
  e.preventDefault(); // 기본 폼 제출 동작 막기
  console.log('전송 버튼을 클릭했습니다.');
});

// 여기에서 userInput을 처리하는 로직을 추가합니다.
const handleTyping = (userInput) => {
  console.log('User input:', userInput);
};

// ! ----------------------------------- key event area END
/*
 debouce의 기본 로직은 
 1. timer를 설정 - initialize --> undefined 할당
 2. timer가 있으면 -> 타이머를 clear하고 && setTimeout(fn(),param ms)   우린 --> wait인자 --> setTimeout(fn(),wait) 
 3. timer가 없으면, -> setTimeout(fn(),param ms) // --> setTimeout(fn(),wait) 
*/
// 예시 함수 - 타이핑 함수
// 디바운스 함수
const debounce = (func, wait = 300, immediate = false) => {
  let timer; //클로져 - undefined; 최초

  const debounced = (...args) => {
    // timer - true면 cleartimeout실행
    if (timer) clearTimeout(timer);

    // console.log('timer', timer);
    // console.log('args', args); // 입력값에 대한 그룹핑이 가능 - 인자가 됨
    // if(!immediate)
    //! 타이머를 설정함 - setTimeout()에 전달해준 callback함수와 ,지연시간을 timer에 담고 (timer가 식별자가 됨)
    timer = setTimeout(() => {
      console.log(args);
      func(args); // func()= handleTyping(args) - 현재는
    }, wait);
  };
  return debounced;
};
const debouncedFn = debounce(handleTyping, 1500, true);
// ! --------------------------------------------
//1. submit이벤트에 이벤트 리스너를 달아주자
//* submit이 발생하면 바로 호출되도록(immediate)
// $input.addEventListener('input', (e) => handleTyping(e));
// 타이핑시마다 ev가 발생하는 코드임
// 호출시에 지연 시간을 넣어주고   / 즉시실행할지를 boolean값으로 줘야됨
// debounce = (handleTyping, 1000, true);

// setTimeout( [함수 또는 문자열], [ 지연될 시간 ] , [인자1], [인자2], . . .  );
