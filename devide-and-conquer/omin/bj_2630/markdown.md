## 2630번 문제

[문제 링크](https://www.acmicpc.net/problem/2630)

### 풀이코드

```js
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [N, ...rest] = fs.readFileSync(filePath).toString().trim().split('\n');

const board = rest.map(line => line.split(' ').map(Number));

const [whiteCount, blueCount] = getPaperCount({
  board,
  xStart: 0,
  xEnd: N - 1,
  yStart: 0,
  yEnd: N - 1,
});

console.log(whiteCount);
console.log(blueCount);

/**
 * return [whiteCount, blueCount]
 */
function getPaperCount({ board, xStart, xEnd, yStart, yEnd }) {
  if (isSameColor({ board, xStart, xEnd, yStart, yEnd })) {
    return board[xStart][yStart] === 0 ? [1, 0] : [0, 1];
  }

  const xCenter = Math.floor((xStart + xEnd) / 2);
  const yCenter = Math.floor((yStart + yEnd) / 2);

  const first = getPaperCount({
    board,
    xStart,
    xEnd: xCenter,
    yStart,
    yEnd: yCenter,
  });

  const second = getPaperCount({
    board,
    xStart: xCenter + 1,
    xEnd,
    yStart,
    yEnd: yCenter,
  });

  const third = getPaperCount({
    board,
    xStart,
    xEnd: xCenter,
    yStart: yCenter + 1,
    yEnd,
  });

  const fourth = getPaperCount({
    board,
    xStart: xCenter + 1,
    xEnd,
    yStart: yCenter + 1,
    yEnd,
  });

  return getTotalPaperCount([].concat(first, second, third, fourth));
}

function isSameColor({ board, xStart, xEnd, yStart, yEnd }) {
  let color = board[xStart][yStart];

  for (let i = xStart; i <= xEnd; i++) {
    for (let j = yStart; j <= yEnd; j++) {
      if (board[i][j] !== color) return false;
    }
  }

  return true;
}

function getTotalPaperCount(sumArr) {
  let whiteCount = 0;
  let blueCount = 0;

  sumArr.forEach((elem, idx) => {
    if (idx % 2 === 0) {
      whiteCount += elem;
    } else {
      blueCount += elem;
    }
  });

  return [whiteCount, blueCount];
}
```

### 생각한 것

1. 더 이상 쪼갤 수 없을 때까지 재귀적으로 문제를 쪼개어 해결한 뒤, 이를 합쳐서 답을 구하는 분할정복 문제이다.
2. $N * N$만큼의 보드를 하나의 색을 가진 종이가 나올 때까지 4분면으로 쪼개면 된다. 하나의 원소로 쪼개지면 항상 같은 색이기 때문에 종료조건이 된다.
3. 한 원소만 있지 않고, 크기가 2\*2 이상이어도 하나의 색만을 포함한다면 더 이상 쪼개지 않는다.
4. 같은 색인지 판별하는 함수, 총합을 구하는 함수를 분리해서 분할정복으로 재귀적으로 프로그래밍을 해본다.

### 시간 복잡도

$O(N^2)$

### 사용한 자료구조 / 알고리즘

- 분할정복

### 코멘트

- 4분면을 어떻게 분할하여 문제를 풀어낼 것인지 고민하는 게 오래 걸렸다.

### 난이도 / 걸린 시간

- 실버2 / 2시간
