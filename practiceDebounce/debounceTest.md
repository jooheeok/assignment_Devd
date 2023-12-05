# 디바운스(debounce)

```javascript
const $input = document.querySelector('#input');
const $app = document.querySelector('#app');

const callAjaxRequest = (e) => {
  $app.insertAdjacentHTML('beforeend', `<p>ajax요청 : ${e.target.value}</p>`);
};
// ! 인자 func가 callAjaxRequest
const debounce = (func) => {
  let timer; // 클로저
  // debounce에 인자로 callAjaxRequset를 인자로 넣어서 절달한 것과 별개로 debounce가 eventListener에 등록된 함수이기 때문에 -> ev가 발생했을 때 브라우저 이벤트 처리 메커니즘에 의해 함수 내부에서 e가 발생하면 e가 동작할 수 있도록 되어있는 듯

  return (e) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(func(e), 500);
  };
};
$input.addEventListener('input', debounce(callAjaxRequest));

// 이렇게 디바운스가 적용되지 않으면 타이핑이 발생할 때마다 ev를 호출하게 됨
```

### 코드를 이해해보자

debounce함수는 addEventListener에 등록된 함수이다.

    $input.addEventListener('input', debounc(callAjaxRequest));

- 이벤트 리스너에 등록된 함수는 항상 이벤트 객체를 첫 번째 매개변수로 받게 설계되어 있음
  즉, input 이벤트가 발생할 때 브라우저는 이벤트 핸들러에게 이벤트 객체를 전달함
  그리고 여기서 e는 이벤트 객체를 받는 매개변수

- 이벤트 핸들러에 등록된 함수는 해당 이벤트가 발생했을 때 자동으로 호출되고, 이때 브라우저는 이벤트 객체를 해당 함수에 전달. 이러한 동작은 브라우저의 이벤트 처리 메커니즘에 의해 이루어짐
- addEventListener 함수로 등록된 콜백 함수는 이벤트 핸들러로 동작하며, 이벤트 객체 e를 자동으로 전달

### ETC 정리

#### insertAdjacentHTML

JavaScript에서 제공하는 메서드로, HTML 콘텐츠를 특정 위치에 요소에 삽입하는 데 사용된다. 이 메서드는 DOM(Document Object Model)에 새로운 HTML 콘텐츠를 추가하는 유연한 방법을 제공한다.<br/>

##### | insertAdjacentHTML의 구문(매개변수)

    insertAdjacentHTML(position, text)

- position(위치 문자열) : HTML 콘텐츠를 삽입할 대상 요소와의 관계에서 어디에 삽입할지를 지정한다.

##### | 다음 값 중 하나

- 'beforebegin': 대상 요소 바로 앞에 HTML 콘텐츠를 삽입한다.
- 'afterbegin': 대상 요소의 콘텐츠의 처음에, 기존 콘텐츠 앞에 HTML 콘텐츠를 삽입한다.
- 'beforeend': 대상 요소의 콘텐츠의 끝에, 기존 콘텐츠 뒤에 HTML 콘텐츠를 삽입한다.
- 'afterend': 대상 요소 바로 뒤에 HTML 콘텐츠를 삽입한다.

## 위에 코드에서 부족한 것

디바운싱 그룹에서 처음에 실행한 함수를 처리하는 것을 확인하지 않았다.

#### 프로그래밍에서의 디바운싱

연이어 발생한 이벤트를 하나의 그룹으로 묶어서 처리하는 방식으로, 주로 그룹에서 처음이나 마지막으로 실행된 함수를 처리하는 방식으로 사용됨

### leading edge & trailing edge

실제 디바운싱은 이벤트를 처리하는 시점으로 위의 두가지로 나뉘어질 수 있다.

#### | leading edge는 처음에 실행하는 함수를 처리하고 그 뒤에 입력을 무시한다.

- ex) '안녕하세요'를 타이핑한다면, 처음 입력한 'o'만 입력되고, 그 뒤는 무시한다.

#### | trailing edge는 가장 마지막으로 실행하는 함수를 처리한다

### debounce leading edge vs throttling

<mark> 첫 요청이 들어오고난 이후 일정시간동안 들어오는 모든 요청을 무시한다는 점에서 throttling과 유사하게 보임 </mark>

#### | debounce leading edge

그러나 '디바운스 리딩 엣지'는 설정한 타임안에 요청이 지속적으로 들어오게되면, '모든 요청을 무시'하게 됨<br/>
즉, 설정한 시간 안에 요청이 지속적으로 발생한다면 무한적으로 요청이 무시되는 것을 볼 수 있다.

#### | throttling

반면에 쓰로틀링은 '요청이 지속적으로 들어올 경우' 정해진 '타이머 시간이 지나면 요청을 허용'한다.
