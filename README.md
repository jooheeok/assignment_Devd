# Devd FE 과제

### | 과제 설명

#### 폴더 구조

```javascript
|---📁 DevD
    |
    |---📁 assignment_result
    |   |---📄 debounce_JSversion.js
    |   |---📄 debounce.js
    |   |---📄 debounce.ts
    |   |---📄 index.html
    |
    |---📁 practice_before_assignment
    |   |---📁 practiceDebounce
    |   |---📁 practiceDebounceLeadingEdge
    |   |---📁 practiceThrottle
    |
    |---📄 .gitignore
    |---📄 .prettierrc.js
    |---📄 package.json
    |---📄 README.md
    |---📄 tsconfig.json
```

#### 📁 assignment_result

※ 제출 과제물이 담긴 폴더입니다.<br/>

| debounce_JSversion.js<br/>
&nbsp; &nbsp;최종 결과물 이전에 중간 코드입니다.<br/>
&nbsp; &nbsp;typescript가 아직 부족해서 js로 코드를 작성한 이후에 ts로 변경해주었습니다.

| debounce.ts<br/>
&nbsp; &nbsp;최종 결과물인 코드입니다.

| debounce.js<br/>
&nbsp; &nbsp;debounce.ts를 컴파일한 js파일입니다.

| index.html<br/>
&nbsp; &nbsp;debounce 함수를 구동해보기 위해 만든 html파일입니다.

#### 📁 practice_before_assignment

&nbsp; &nbsp;디바운스 함수를 작성하기 전에 디바운스와 쓰로틀을 간단하게 학습했습니다.

<br/>
<hr/>
<br/>

### | 코드 설명

```typescript
function debounce<T extends unknown[]>(func: (...args: T) => void, wait = 500, immediate = false) {
  let timer: ReturnType<typeof setTimeout> | null;

  const debounced = (...args: T) =>
 // ... 이하 생략
```

#### debounce 함수

디바운싱은 일정 시간 동안 연이어 호출된 함수 중 마지막 호출만을 실행하도록 하는 기술입니다.
작성한 debounce함수는 전달하는 함수를 디바운스하는 데 사용됩니다.

#### 제네릭 사용

제네릭을 사용한 이유는 현재 debounce함수가 어떤 형태의 인자를 받을지 알 수 없기에, 제네릭타입을 사용하여 어떤 형태의 함수든 debounce 함수의 인자로 전달할 수 있게 하고자 했습니다. 그리하여 어떤 형태의 함수든 debounce 함수로 래핑할 수 있게 만들었습니다.

#### timer 변수의 ReturnType 사용 이유

보통 타이머의 타입을 number로 많이 작성하나 "ReturnType<typeof setTimeout>"을 사용하여 TypeScript가 timer 변수의 타입을 자동으로 추론할 수 있도록 했습니다. 고정된 number로 타입을 제한할 떄 보다 확장성이 좋습니다.

```typescript
new Promise((resolve, reject) => {
    if (immediate) {
    resolve(func(...args));
    return;
    }
```

#### Promise 비동기 처리에서 reject 사용 이유

reject를 사용하는 이유는 디바운스된 함수 내부에서 발생한 예외를 프로미스 체인 상에서 적절하게 처리하기 위해 사용했습니다.

#### return 문

resolve(func(...args))를 호출한 후에 함수를 즉시 종료하고 이후의 코드를 실행하지 않도록 하기 위해 return을 사용해서 코드의 흐름을 제어했습니다. immediate가 참일 때 프로미스를 즉시 이행시킨 후, 더 이상의 타이머나 디바운스 동작이 필요하지 않기 때문에 return을 통해 문을 종료시켜줬습니다.

<br/>

<hr/>
<br/>

<!-- ### | test 방법

<br/>
<hr/>
<br/> -->
