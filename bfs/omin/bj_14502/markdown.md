## 14502번 문제

[문제 링크](https://www.acmicpc.net/problem/14502)

### 풀이 코드

```js
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';

const [NM, ...rest] = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = NM.split(' ').map(Number);
const board = rest.map(line => line.trim().split(' ').map(Number));

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

let maxZeroCnt = 0;

const locations = getLocationsOfZero(board);
const adj = getAdjacents(locations);
const visited = getVisited(locations);
const combinations = getCombinations(adj, visited);

combinations.forEach(combination => {
  const tempBoard = JSON.parse(JSON.stringify(board));
  const locations = combination.split('|');

  locations.forEach(location => {
    [x, y] = location.split(',').map(Number);
    tempBoard[x][y] = 1;
  });

  const visitedBoard = Array.from({ length: N }, () =>
    Array.from({ length: M }).fill(false)
  );

  traverseBoard(tempBoard, visitedBoard);
  const zeroCnt = getZeroCnt(tempBoard);

  maxZeroCnt = Math.max(zeroCnt, maxZeroCnt);
});

console.log(maxZeroCnt);

function getLocationsOfZero(board) {
  const locations = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] !== 0) continue;
      locations.push(`${i},${j}`);
    }
  }
  return locations;
}

function getAdjacents(locations) {
  const adj = {};

  locations.forEach((location, idx, origin) => {
    adj[location] = origin.slice(idx + 1);
  });

  return adj;
}

function getVisited(locations) {
  const visited = {};
  locations.forEach(location => {
    visited[location] = false;
  });

  return visited;
}

function getCombinations(adj, visited) {
  const combinations = [];

  for (let node in adj) {
    dfs(node, 1, node, visited, adj, combinations);
  }

  return combinations;
}

function traverseBoard(board, visited) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] === 2 && !visited[i][j]) {
        bfs(i, j, visited, board);
      }
    }
  }
}

function getZeroCnt(board) {
  let cnt = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] === 0) {
        cnt++;
      }
    }
  }

  return cnt;
}

function dfs(location, step, path, visited, adj, combinations) {
  if (step === 3) {
    combinations.push(path);
    return;
  }

  visited[location] = true;

  adj[location].forEach(node => {
    if (!visited[node]) {
      const newPath = path.concat('|', node);
      dfs(node, step + 1, newPath, visited, adj, combinations);
    }
  });

  visited[location] = false;
}

function bfs(x, y, visited, board) {
  const queue = [];

  visited[x][y] = true;
  queue.push([x, y]);

  while (queue.length) {
    const [curX, curY] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nx = curX + dx[i];
      const ny = curY + dy[i];

      if (isGoodToGo(nx, ny, board, visited)) {
        visited[nx][ny] = true;
        board[nx][ny] = 2;
        queue.push([nx, ny]);
      }
    }
  }
}

function isGoodToGo(x, y, board, visited) {
  return (
    x >= 0 && x < N && y >= 0 && y < M && !visited[x][y] && board[x][y] === 0
  );
}
```

### 생각한 것

1. 벽을 정확히 3개 세우면서 안전영역이 최대 몇인지 구하는 문제.
2. 다음의 순서로 실행한다.
   - 1. 벽을 세운다
   - 2. 바이러스를 퍼트린다.
   - 3. 안전영역의 크기를 측정한다.
3. 벽을 세울지 어떻게 결정할까?
   - 가설 1: 매번 비교할 때마다 1의 대각선에 1을 놓아야 가장 많은 공간을 확보한다. -> 거짓
   - 가설 2: 0을 놓을 수 있는 모든 조합을 본다. -> 참
     - 벽은 세 개만 놓을 수 있고, 바이러스의 초기 위치는 최소 2개 이상이다. $N <= M <= 8$
     - 최악의 상황에서는 $8 * 8$ 보드에서 2를 뺀 62개의 '0'중에서 3개를 뽑는 조합을 만들어야 한다.
     - 각각 자리수 별로 숫자를 놓는 경우의 수는 $62 * 61 * 60 = 62! / (62-3)!$ 이지만, `[(0, 1) (1, 0)]`과 `[(1, 0), (0, 1)]`은 같은 것이기에 중복을 제거하여 최대 $62! / (62 - 3)! * 3! = 1,361,520$ 번의 연산을 한다.
     - 이렇게 구한 조합에 완전 탐색을 적용하면 최소 $84,414,240$ 이상, 최대 1억 이하의 연산을 한다.
     - 시간 복잡도 상 효율적인 알고리즘이라고 할 수는 없지만 문제의 시간 제한 내에 풀 수 있다.
4. 조합별로 순서 2번의 알고리즘을 실행하고, 안전영역의 크기를 현재의 최댓값과 비교하여 담는다.

### 시간 복잡도

$O(N!)$

### 사용한 자료구조 / 알고리즘

인접 리스트 / BFS & DFS, 조합(백트래킹)

### 코멘트

- 벽을 어떻게 배치할 것인지가 중요한 문제였다.

### 난이도 / 걸린 시간

- 골드4 / 2시간 57분
