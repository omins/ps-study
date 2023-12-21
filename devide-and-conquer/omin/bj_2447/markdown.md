## 2447번 문제

[문제 링크](https://www.acmicpc.net/problem/2447)

### 풀이코드

```js
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const N = Number(fs.readFileSync(filePath).toString().trim());
const board = Array.from({ length: N }, () =>
  Array.from({ length: N }).fill(' ')
);

fillBoard(board, 0, N - 1, 0, N - 1, N);
printBoard(board);

function fillBoard(board, xStart, xEnd, yStart, yEnd, n) {
  if (n === 1) {
    board[yStart][xStart] = '*';
    return;
  }

  const offset = n / 3;

  const xCenter = xStart + offset;
  const yCenter = yStart + offset;

  for (let y = yStart; y <= yEnd; y += offset) {
    for (let x = xStart; x <= xEnd; x += offset) {
      if (x === xCenter && y === yCenter) continue;
      fillBoard(board, x, x + offset - 1, y, y + offset - 1, offset);
    }
  }
}

function printBoard(board) {
  console.log(board.map(line => line.join('')).join('\n'));
}
```

### 생각한 것

1. 보드를 N/3 으로 재귀적으로 탐색한다. N이 1일 때는 종료조건으로, 곧바로 원소를 반환한다.
2. 이 분할을 어떻게 구현하고, 어떻게 출력할까? 초기에 N \* N 배열을 초기화하고, 이를 채우는 방법으로 해본다.
3. 시작 index, 종료 index, N의 정보가 있으면 공백의 index를 구할 수 있고, 순회할 수도 있다.
4. 이를 재귀적으로 순회해서 최종적으로 보드가 모두 채워지도록 한다.
5. 보드를 출력한다.

### 시간 복잡도

$O(N^2)$

### 사용한 자료구조 / 알고리즘

- 분할정복

### 코멘트

- 작은 문제로 분할하는 것 뿐만 아니라 작은 문제의 답을 어떻게 조합하는지가 중요했다.

### 난이도 / 걸린 시간

- 골드5 / 1시간 41분
