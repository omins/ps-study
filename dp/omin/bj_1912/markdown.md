## 1912번 문제

[문제 링크](https://www.acmicpc.net/problem/1912)

### 풀이코드

```js
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [n, rest] = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(n);

const arr = rest.split(' ').map(Number);
const memo = Array.from({ length: N }).fill(null);

calculateGreatestSum(0, arr, memo);
console.log(Math.max(...memo));

function calculateGreatestSum(index, arr, memo) {
  if (memo[index] !== null) return memo[index];
  if (index === arr.length - 1) {
    memo[index] = arr[index];
    return arr[index];
  }

  let localMax = -Infinity;

  const childMax = calculateGreatestSum(index + 1, arr, memo);
  localMax = Math.max(localMax, arr[index], arr[index] + childMax);

  memo[index] = localMax;
  return localMax;
}
```

### 생각한 것

1. 현재 탐색하는 index에서 시작해 연속되는 숫자를 더해가는 경우 최대 합은 Max(index, index + index + 1의 최대 합) 으로 일반화 할 수 있다.
2. 따라서 재귀적으로 가장 끝 원소부터 최대 합을 구한다. 가장 끝 원소는 더할 원소가 없기 때문에 그 자체로 최대 합이다. 가장 끝 원소 앞 원소의 최대 합은 해당 원소와 해당 원소 + 가장 끝 원소 중 최대인 수이다.
3. 이 과정은 가장 첫 원소까지 반복한다.

### 시간 복잡도

$O(N)$

### 사용한 자료구조 / 알고리즘

재귀, DP

### 코멘트

- 연속된 수 !== 부분 수열

### 난이도 / 걸린 시간

- 실버3 / 1시간 20분
