## 1992번 문제

[문제 링크](https://www.acmicpc.net/problem/1992)

### 풀이코드

```js
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [N, ...rest] = fs.readFileSync(filePath).toString().trim().split('\n');
const board = rest.map(line => line.split('').map(Number));

console.log(compress(board, 0, N - 1, 0, N - 1));

function compress(board, xStart, xEnd, yStart, yEnd) {
  if (isCompressible(board, xStart, xEnd, yStart, yEnd)) {
    return String(board[yStart][xStart]);
  }

  const xCenter = getCenter(xStart, xEnd);
  const yCenter = getCenter(yStart, yEnd);

  const first = compress(board, xStart, xCenter, yStart, yCenter);
  const second = compress(board, xCenter + 1, xEnd, yStart, yCenter);
  const third = compress(board, xStart, xCenter, yCenter + 1, yEnd);
  const fourth = compress(board, xCenter + 1, xEnd, yCenter + 1, yEnd);

  return `(${first}${second}${third}${fourth})`;
}

function isCompressible(board, xStart, xEnd, yStart, yEnd) {
  let digit = board[yStart][xStart];

  for (let i = yStart; i <= yEnd; i++) {
    for (let j = xStart; j <= xEnd; j++) {
      if (board[i][j] !== digit) return false;
    }
  }

  return true;
}

function getCenter(start, end) {
  return Math.floor((start + end) / 2);
}
```

### 생각한 것

1. 보드가 하나의 원소(0 or 1)로 이루어져 있을 때까지 재귀적으로 사분면을 탐색한다.
2. 한 개의 원소만 남으면 하나의 원소로만 이루어져있음을 보장하기 때문에 이는 종료조건으로 적합하다.
3. 한 개의 원소로만 이루어져있지 않을 때는 괄호 안에 사분면의 압축 결과를 담아 반환한다.

### 시간 복잡도

$O(N^2)$

### 사용한 자료구조 / 알고리즘

- 분할정복

### 코멘트

- 처음에 `board[yStart][xStart]`이 부분을 `board[xStart][yStart]` 이렇게 써서 틀린 답이 나왔다. x-axis, y-axis를 한 번 생각해볼 필요가 있다.

### 난이도 / 걸린 시간

- 실버1 / 1시간
