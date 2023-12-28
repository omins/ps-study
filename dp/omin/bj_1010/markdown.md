## 1010번 문제

[문제 링크](https://www.acmicpc.net/problem/1010)

### 풀이코드

```js
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
```

### 생각한 것

1. M개의 다리에 N개의 다리를 연결하는 경우의 수는 곧 M개 중 N개를 뽑는 경우의 수와 같다.
2. 조합 공식을 적용해 계산한다 $$n! / (n - r)!r!$$. 이때 factorial 함수를 cache하여 중복되는 연산을 줄일 수 있다.
3. N, M이 최대 29이기 때문에 팩토리얼 연산 결과를 담을 수 있는 BigInt를 사용한다.

### 시간 복잡도

$O(N)$

### 사용한 자료구조 / 알고리즘

맵 / 조합, DP

### 코멘트

- 이 문제가 조합 문제라는 사실을 좀 더 빨리 떠올렸다면 좋았을 것

### 난이도 / 걸린 시간

- 실버5 / 1시간 50분
