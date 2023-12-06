## 1072번 문제

[문제 링크](https://www.acmicpc.net/problem/1072)

### 풀이코드

```js
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [X, Y] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const MAX = 1_000_000_000;

let answer = -1;
let start = 0;
let end = MAX;
let base = getPercent(X, Y);

while (start <= end) {
  let center = Math.floor((start + end) / 2);
  const x = X + center;
  const y = Y + center;

  const result = getPercent(x, y);

  if (result <= base) {
    start = center + 1;
  } else {
    answer = center;
    end = center - 1;
  }
}

console.log(answer);

function getPercent(x, y) {
  return Math.floor((y * 100) / x);
}
```

### 생각한 것

1. 2를 곱해가며 $2^n$ ~ $2^{n-1}$ 으로 범위를 한정한 뒤 이분탐색하려고 했다. 하지만 99%에서 시작하는 경우 범위를 특정할 수 없어 무한정 수가 커지는 문제가 있다.
2. 해결책을 검색하던 중 최대 값인 10억을 범위로 설정하고 이분 탐색이 가능하다는 것을 알게 되었다.

### 시간 복잡도

$O(log N)$

### 사용한 자료구조 / 알고리즘

- 이분탐색

### 코멘트

- 이분탐색 로직보다는 탐색 범위를 어떻게 결정할 것인가를 떠올리는 게 핵심이었다.

### 난이도 / 걸린 시간

- 실버3 / 2시간 30분 (답 참조)
