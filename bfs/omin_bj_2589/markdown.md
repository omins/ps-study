## 2589번 문제

[문제 링크](https://www.acmicpc.net/problem/2589)

### 풀이 코드

```js
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const [NM, ...rest] = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = NM.split(' ').map(Number);
const board = rest.map(line => line.trim().split(''));

const LAND = 'L';

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

let maxStep = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] !== LAND) continue;

    const visited = Array.from({ length: N }, () =>
      Array.from({ length: M }).fill(false)
    );

    bfs(i, j, board, visited, N, M);
  }
}

console.log(maxStep);

function bfs(x, y, board, visited, n, m) {
  const queue = [];
  queue.push([x, y, 0]);
  visited[x][y] = true;

  while (queue.length) {
    const [curX, curY, step] = queue.shift();
    maxStep = Math.max(step, maxStep);

    for (let i = 0; i < 4; i++) {
      const nx = curX + dx[i];
      const ny = curY + dy[i];

      if (!isGoodToGo(nx, ny, board, visited, n, m)) continue;

      visited[nx][ny] = true;
      queue.push([nx, ny, step + 1]);
    }
  }
}

function isGoodToGo(x, y, board, visited, n, m) {
  return (
    0 <= x && x < n && 0 <= y && y < m && board[x][y] === LAND && !visited[x][y]
  );
}
```

### 생각한 것

1. 보물은 서로 최단 거리를 이동하는 데 가장 긴 시간이 걸리는 육지 두 곳에 위치한다. = 가장 긴 최단거리를 구하는 문제.
2. 최단거리를 보장하기 위해 BFS로 탐색한다.
3. 출발 지점에 따라 가장 긴 최단거리가 다르기 때문에 방문할 수 있는 모든 지점에서 BFS를 수행한다.
4. 탐색을 할 때마다 현재의 가장 긴 최단거리와 비교하여 최댓값을 갱신한다.
5. N과 M이 50 이하이기 때문에 $N^4$ 이어도 시간은 충분하다.

### 시간 복잡도

$O(N^4)$

### 사용한 자료구조 / 알고리즘

BFS

### 코멘트

- 테스트케이스를 직접 여러 개 넣어봄으로써 실수를 잡을 수 있었다.

### 난이도 / 걸린 시간

- 골드5 / 48분
