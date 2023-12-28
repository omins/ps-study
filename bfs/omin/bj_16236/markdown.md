## 16236번 문제

[문제 링크](https://www.acmicpc.net/problem/16236)

### 풀이 코드

```js
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const [n, ...rest] = fs.readFileSync(filePath).toString().trim().split('\n');
const board = rest.map(line => line.trim().split(' ').map(Number));

const N = Number(n);
const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

const [x, y] = getSharkLocation(board);
const sharkLocation = [x, y];

let answer = 0;
let sharkPower = 2;
let feededCnt = 0;

while (true) {
  const [x, y] = sharkLocation;
  board[x][y] = 0;

  const visited = getVisited(N);
  const foods = getFoods(x, y, visited, board, sharkPower);

  if (foods.length === 0) break;

  const [fx, fy, distance] = getFoodToEat(foods);

  sharkLocation[0] = fx;
  sharkLocation[1] = fy;

  if (sharkPower === ++feededCnt) {
    sharkPower++;
    feededCnt = 0;
  }

  answer += distance;
}

console.log(answer);

function getSharkLocation(board) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (board[i][j] === 9) {
        return [i, j];
      }
    }
  }
}

function getVisited(n) {
  return Array.from({ length: n }, () => Array.from({ length: n }).fill(false));
}

function getFoods(x, y, visited, board, sharkPower) {
  const foods = [];
  let minStepToFood = Infinity;
  const queue = [];

  queue.push([x, y, 0]);
  visited[x][y] = true;

  while (queue.length) {
    const [curX, curY, step] = queue.shift();

    if (
      step !== 0 &&
      step <= minStepToFood &&
      isFood(curX, curY, board, sharkPower)
    ) {
      foods.push([curX, curY, step]);
      minStepToFood = step;
    }

    for (let i = 0; i < 4; i++) {
      const nx = curX + dx[i];
      const ny = curY + dy[i];

      if (!isGoodToGo(nx, ny, board, visited, sharkPower)) continue;
      visited[nx][ny] = true;
      queue.push([nx, ny, step + 1]);
    }
  }

  return foods;
}

function getFoodToEat(foods) {
  const result = [...foods].sort((a, b) => {
    [ax, ay] = a;
    [bx, by] = b;

    if (ax < bx) {
      return -1;
    } else if (ax === bx && ay < by) {
      return -1;
    } else {
      return 1;
    }
  });

  return result[0];
}

function isGoodToGo(x, y, board, visited, sharkPower) {
  return (
    x >= 0 &&
    x < N &&
    y >= 0 &&
    y < N &&
    !visited[x][y] &&
    board[x][y] <= sharkPower
  );
}

function isFood(x, y, board, sharkPower) {
  return board[x][y] !== 0 && board[x][y] < sharkPower;
}
```

### 생각한 것

1. 아기 상어가 물고기를 먹을 수 없을 때까지 반복하면 총 몇칸을 이동하는지 구해야 한다.
2. 상어보다 작은 물고기만 먹을 수 있고, 상어와 같은 크기인 경우 먹을 수는 없지만 지날 수 있다.
3. 이터레이션 순서

   1. 현재 상어 위치에서 BFS로 가장 가까운 먹이를 찾는다.

      - 먹을 수 있는 먹이가 없으면 종료한다. 7번으로 이동

   2. 가장 가까운 먹이 중에서도 가장 위, 왼쪽에 있는 먹이를 고른다.
   3. 고른 위치에 있는 물고기를 먹고, 먹은 물고기 수를 증가시킨다.
      - 먹은 물고기 수가 현재 상어 크기랑 같다면 상어 크기를 증가 시키고 먹은 물고기 수를 0으로 초기화한다.
   4. 물고기 위치로 상어를 이동시킨다.
   5. 먹이까지의 거리를 총 이동 거리에 더한다.
   6. 1번으로
   7. 총 얼만큼 이동했는지 출력한다.

### 시간 복잡도

$O(N^3)$

### 사용한 자료구조 / 알고리즘

BFS

### 코멘트

- 상어가 이동할 때 해당 위치를 초기화 하지 않으면 완전히 다른 답이 나올 수 있다.

### 난이도 / 걸린 시간

- 골드3 / 1시간 51분
