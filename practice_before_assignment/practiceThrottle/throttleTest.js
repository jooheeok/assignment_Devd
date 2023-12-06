const $app = document.querySelector('#app');
const $countNumber = document.querySelector('#countNumber');
let count = 0;

const throttle = (func) => {
  let timer;
  return () => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        func();
      }, 1000);
    }
  };
};

const increaseCountNumber = () => {
  $countNumber.innerText = count++;
};

$app.addEventListener('scroll', throttle(increaseCountNumber));
