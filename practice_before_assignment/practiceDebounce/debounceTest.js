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
