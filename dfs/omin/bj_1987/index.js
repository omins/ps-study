const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [nm, ...rest] = fs.readFileSync(filepath).toString().trim().split('\n');
const [N, M] = nm.split(' ').map(Number);
const board = rest.map(line => line.split(''));
const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }).fill(false)
);
const visitedChar = new Set();

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

let maxValue = -Infinity;

dfs(0, 0);
console.log(maxValue);

function dfs(x, y) {
  visitedChar.add(board[x][y]);
  visited[x][y] = true;

  maxValue = Math.max(visitedChar.size, maxValue);

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (isValidLocation(nx, ny) && isTraversable(nx, ny)) {
      dfs(nx, ny);
    }
  }

  visited[x][y] = false;
  visitedChar.delete(board[x][y]);
}

function isValidLocation(x, y) {
  return x >= 0 && x < N && y >= 0 && y < M;
}

function isTraversable(x, y) {
  return !visitedChar.has(board[x][y]) && !visited[x][y];
}
