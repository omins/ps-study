## 1074번 문제

[문제 링크](https://www.acmicpc.net/problem/1074)

### 풀이코드

```js
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [N, y, x] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

console.log(solution(N, x, y));

function solution(N, x, y) {
  let start = 0;
  const length = Math.pow(2, N);

  let xStart, xEnd, yStart, yEnd;
  xStart = yStart = 0;
  xEnd = yEnd = length - 1;

  while (true) {
    if (isTarget(xStart, xEnd, yStart, yEnd, x, y)) return start;

    const quadrantInfo = getQuadrantInfo(xStart, xEnd, yStart, yEnd, x, y);
    const { index } = quadrantInfo;
    ({ xStart, xEnd, yStart, yEnd } = quadrantInfo);

    const area = Math.pow(xEnd - xStart + 1, 2);
    start += index * area;
  }
}

function getQuadrantInfo(xStart, xEnd, yStart, yEnd, xTarget, yTarget) {
  const xCenter = getCenter(xStart, xEnd);
  const yCenter = getCenter(yStart, yEnd);

  let nxStart = xStart;
  let nxEnd = xEnd;
  let nyStart = yStart;
  let nyEnd = yEnd;
  let index = 0;

  if (xTarget < xCenter && yTarget < yCenter) {
    index = 0;
    nxEnd = xCenter - 1;
    nyEnd = yCenter - 1;
  } else if (xTarget >= xCenter && yTarget < yCenter) {
    index = 1;
    nxStart = xCenter;
    nyEnd = yCenter - 1;
  } else if (xTarget < xCenter && yTarget >= yCenter) {
    index = 2;
    nxEnd = xCenter - 1;
    nyStart = yCenter;
  } else if (xTarget >= xCenter && yTarget >= yCenter) {
    index = 3;
    nxStart = xCenter;
    nyStart = yCenter;
  }

  return {
    xStart: nxStart,
    xEnd: nxEnd,
    yStart: nyStart,
    yEnd: nyEnd,
    index,
  };
}

function getCenter(start, end) {
  return Math.floor((start + end + 1) / 2);
}

function isTarget(xStart, xEnd, yStart, yEnd, x, y) {
  return xStart === x && xEnd === x && yStart === y && yEnd === y;
}
```

### 생각한 것

1. 2의 N제곱 크기의 보드를 Z 방식으로 재귀적으로 탐색하였을 때 r행 c열의 방문순서 찾기. N은 최대 15이기 때문에 완전 탐색하려면 $(2^15)^2$으로 최대 $2^30$ 번 연산해야 한다.
2. 시간제한은 0.5초 이기 때문에 최대 5천만번 내의 연산으로 끝내야 하는데, $2^30$은 약 10억으로 시간 초과다.
3. 4분면을 Z의 형태로 방문한다는 특성을 이용해서 풀어보자.
4. r행 c열은 현재의 사분면 중 어디에 있는지 알아내고, 사분면의 넓이를 알아내면 해당 사분면의 시작(방문 순서)을 알 수 있다.
5. 핵심 공식은 `시작지점 += 사분면 index ({0, 1, 2, 3} 중 하나) * 사분면 넓이`이다.
6. 타겟을 찾을 때까지 재귀적으로 사분면에서 위치를 찾는다.

### 시간 복잡도

$O(logN)$

### 사용한 자료구조 / 알고리즘

- 분할정복

### 코멘트

- 모든 경우를 보지 않아도 답을 구할 수 있다는 사실을 파악하고, 그 방법을 알아내야 했다.

### 난이도 / 걸린 시간

- 실버1 / 1시간 17분
