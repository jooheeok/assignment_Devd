const $input = document.querySelector('#input');
const $app = document.querySelector('#app');

const callAjaxRequest = (e) => {
  $app.insertAdjacentHTML('beforeend', `<p>ajax요청 : ${e.target.value}</p>`);
};
const debounce = (func) => {
  let timer;

  return (e) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(func(e), 500);
  };
};
$input.addEventListener('input', debounce(callAjaxRequest));

// * 이렇게 디바운스가 적용되지 않으면 타이핑이 발생할 때마다 ev를 호출하게 됨

// * 테스트 코드
// const $form = document.querySelector('#myForm');

// $form.addEventListener('submit', function (e) {
//   e.preventDefault();
//   callAjaxRequest({ target: { value: $input.value } });
// });
