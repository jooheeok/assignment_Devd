/*
ETC 
* insertAdjacentHTML
 : JavaScript에서 제공하는 메서드로, HTML 콘텐츠를 특정 위치에 요소에 삽입하는 데 사용된다.
   이 메서드는 DOM(Document Object Model)에 새로운 HTML 콘텐츠를 추가하는 유연한 방법을 제공한다.

* insertAdjacentHTML의 구문(매개변수)
 : insertAdjacentHTML(position, text)

- position(위치 문자열) : HTML 콘텐츠를 삽입할 대상 요소와의 관계에서 어디에 삽입할지를 지정합니다. 다음 값 중 하나일 수 있습니다:
  'beforebegin': 대상 요소 바로 앞에 HTML 콘텐츠를 삽입합니다.
  'afterbegin': 대상 요소의 콘텐츠의 처음에, 기존 콘텐츠 앞에 HTML 콘텐츠를 삽입합니다.
  'beforeend': 대상 요소의 콘텐츠의 끝에, 기존 콘텐츠 뒤에 HTML 콘텐츠를 삽입합니다.
  'afterend': 대상 요소 바로 뒤에 HTML 콘텐츠를 삽입합니다.
*/

const targetElement = document.getElementById('target');

// 대상 요소 바로 앞에 HTML 콘텐츠 삽입
targetElement.insertAdjacentHTML('beforebegin', '<p>앞에 추가</p>');

// 대상 요소 콘텐츠의 처음에 HTML 콘텐츠 삽입
targetElement.insertAdjacentHTML('afterbegin', '<p>처음에 추가</p>');

// 대상 요소 콘텐츠의 끝에 HTML 콘텐츠 삽입
targetElement.insertAdjacentHTML('beforeend', '<p>끝에 추가</p>');

// 대상 요소 바로 뒤에 HTML 콘텐츠 삽입
targetElement.insertAdjacentHTML('afterend', '<p>뒤에 추가</p>');
