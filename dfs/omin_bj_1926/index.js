const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [NM, ...rest] = fs.readFileSync(filepath).toString().trim().split('\n');

const [col, row] = NM.split(' ').map(Number);
const grid = rest.map(line => line.trim().split(' ').map(Number));

const visited = Array.from({ length: col }, () =>
  Array.from({ length: row }).fill(false)
);

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

let maxWidth = 0;
let cnt = 0;

for (let i = 0; i < col; i++) {
  for (let j = 0; j < row; j++) {
    if (grid[i][j] === 1 && !visited[i][j]) {
      dfs(i, j);
      cnt += 1;
    }
  }
}

console.log(cnt);
console.log(maxWidth);
console.log(Array.from({ length: 5 }));

function dfs(x, y) {
  const stack = [];
  let width = 1;

  visited[x][y] = true;
  stack.push([x, y]);

  while (stack.length) {
    const [curX, curY] = stack.pop();

    for (let i = 0; i < 4; i++) {
      const nx = curX + dx[i];
      const ny = curY + dy[i];

      if (isValidLocation(nx, ny)) {
        if (isPicToDiscover(nx, ny)) {
          visited[nx][ny] = true;
          width += 1;
          stack.push([nx, ny]);
        }
      }
    }
  }

  maxWidth = Math.max(width, maxWidth);
}

function isValidLocation(x, y) {
  return x < col && x >= 0 && y < row && y >= 0;
}

function isPicToDiscover(x, y) {
  return !visited[x][y] && grid[x][y] === 1;
}
