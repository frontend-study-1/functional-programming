const L = {};

L.filter = function* (func, iter) {
  for (const a of iter) {
    console.log('filter called:', a);
    if (func(a)) yield a;
  }
};

const take = (length, iter) => {
  const result = [];
  for (const a of iter) {
    result.push(a);
    if (result.length === length) return result;
  }

  return result;
};

const numbers = [1, 2, 3, 4, 5];

console.log(
  take(
    2,
    L.filter((x) => x % 2 !== 0, numbers)
  )
);
