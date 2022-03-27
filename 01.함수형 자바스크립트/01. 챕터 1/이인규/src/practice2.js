const _ = require('lodash');

// * 주어진 배열에서 2개의 홀수만 새 배열로 반환하는 코드

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
  _.chain(numbers)
    .filter((x) => x % 2 !== 0)
    .take(2)
    .value()
);
