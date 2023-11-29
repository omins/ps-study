const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [_, ...testCases] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const getFactorial = cacheDecorator(factorial);

testCases.forEach(testCase => {
  const [n, m] = testCase.split(' ').map(BigInt);

  const result = getFactorial(m) / (getFactorial(m - n) * getFactorial(n));
  console.log(Number(result));
});

function factorial(n) {
  if (n <= 1n) return 1n;
  return n * factorial(n - 1n);
}

function cacheDecorator(func) {
  const cache = new Map();

  return function (n) {
    if (cache.has(n)) {
      return cache.get(n);
    } else {
      const result = func.call(this, n);
      cache.set(n, result);
      return result;
    }
  };
}
