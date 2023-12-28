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
