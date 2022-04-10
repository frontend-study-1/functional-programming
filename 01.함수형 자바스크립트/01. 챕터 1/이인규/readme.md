## 함수형 프로그래밍

- 함수형 프로그래밍이란 새로운 라이브러리나 프레임워크를 의미하는 것이 아니라, 코드를 작성하는 방식의 하나를 의미
- 함수형 프로그래밍은 변수에 값을 대입하는 "대입문"이 없는 프로그래밍이라고 할 수도 있음
- 값을 쓰는 동작이 없기 때문에(최소화) 부수효과를 막을 수 있다. 코드의 동작을 예측하기 쉽게 하고 오류를 막게 돕는다.
- 주요 키워드
  - 부수효과 방지: 함수형 프로그래밍에서의 함수는, 함수 스코프 외부의 데이터를 변경하지 않도록 해야 한다.
  - 순수 함수: _멱등성_, 함수가 같은 입력에 대해서 항상 같은 값을 반환해야 한다.
  - 일급 객체: 객체가 함수의 파라미터로 사용되고, 수정되고, 반환될 수 있다.  
    함수형 프로그래밍에서는 함수가 일급 객체가 된다.

## 명령형, 선언형

- _어떻게_ 하는가에 포커스를 맞춘 **명령형 프로그래밍**과 달리, **선언형 프로그래밍**은 _무엇을_ 하는가에 포커스를 맞춘다.
- 명령형과 선언형을 구분할 때 반복문을 예시로 들 수 있다.

```js
// * 배열의 원소를 차례로 출력하는 코드
const arr = [1, 2, 3, 4, 5];

// 명령형
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// 선언형
arr.forEach((each) => {
  console.log(each);
});
```

- 자바스크립트의 `forEach` 함수를 사용하면, 배열의 원소를 "어떻게 참조"하는지에 상관없이, 배열의 원소로 "무엇을" 할 것인지에 대해서만 코드를 작성할 수 있다.
- `forEach` 함수의 내부가 실제로 명령형처럼 `for` 반복문으로 작성되었다고 하더라도, 실제로 `forEach`로 반복문을 사용할 때에는 내부 구현에 신경쓰지 않고 사용할 수가 있다.  
  여기서의 `forEach`는 함수를 인자로 받는 *고차함수*로, 함수형 프로그래밍의 개념이 적용되었다고 할 수 있다.

## 객체지향형과의 비교

- 클래스의 메소드는 함수 외부의 멤버에 접근하는 "부수 효과"를 가진 함수라는 점이, 함수형 프로그래밍과 차이를 갖는다.
  - 객체지향형의 이러한 방식은 클래스의 응집성을 높이는 효과를 갖는다.
  - 함수형 프로그래밍에서는, 함수가 특정 객체에 종속적이지 않기 때문에 재사용하기 용이하다.

## 이야깃거리

- `forEach`에서는 break를 지원하지 않는 문제가 있음

  - 아래와 같이 break와 유사하게 쓸 수 있는 확장 함수를 만들어 쓸 수 있다.

  ```js
  // * practice1.js
  Array.prototype.forEachExt = function (callback) {
    const CustomExceptionForBreak = {};
    const breakLoop = () => {
      throw CustomExceptionForBreak;
    };

    try {
      for (let i = 0; i < this.length; i++) {
        callback(this[i], i, this, breakLoop);
      }
    } catch (err) {
      if (err !== CustomExceptionForBreak) throw err;
    }
  };
  ```

- "break"를 할 수 없어 비효율이라 생각했던 부분을, Generator 함수로 구현한 함수로 개선할 수 있다.  
  (Native Function이 Generator로 되어있지는 않은 것 같음)

  - 주어진 배열에서, 홀수 두 개를 찾아 새 배열로 반환하는 함수

  ```js
  // * practice2.js, practice3.js
  const numbers = [1, 2, 3, 4, 5];

  // * 명령형
  const result = [];
  const findCount = 0;
  for (let i = 0; i < numbers.length; i++) {
    if (findCount === 2) break;
    if (numbers[i] % 2 !== 0) result.push(numbers[i]);
  }
  console.log(result);

  // * 선언형
  console.log(numbers.filter((x) => x % 2 !== 0).slice(0, 2));

  // * 선언형 (지연 평가, Lodash)
  console.log(
    _.chaing(numbers)
      .filter((x) => x % 2 !== 0)
      .take(2)
      .value()
  );
  ```

## 참고사항

- p65. 하단의 `R.lenseProp` -> `R.lensProp` 오타

- [Generator를 이용한 지연 평가](https://armadillo-dev.github.io/javascript/whit-is-lazy-evaluation/)
- [[Youtube] 함수형 프로그래밍과 ES6+](https://www.youtube.com/watch?v=4sO0aWTd3yc)
