const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
let line = 0;

const dx = [0, 0, 1, -1, -1, -1, 1, 1];
const dy = [1, -1, 0, 0, -1, 1, -1, 1];

const LAND = 1;

while (true) {
  const [w, h] = input[line++].split(' ').map(Number);
  if (w === 0 && h === 0) break;

  const visited = Array.from({ length: h }, () =>
    Array.from({ length: w }).fill(false)
  );

  const board = createBoard(input, line, h);
  const answer = getIslandCount(board, visited, w, h);

  console.log(answer);
  line += h;
}

function createBoard(input, line, h) {
  const board = [];
  for (let i = line; i < line + h; i++) {
    const row = input[i].trim().split(' ').map(Number);
    board.push(row);
  }

  return board;
}

function getIslandCount(board, visited, w, h) {
  let cnt = 0;

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (isGoodToGo(board, visited, i, j, w, h)) {
        bfs(board, visited, i, j, w, h);
        cnt++;
      }
    }
  }

  return cnt;
}

function bfs(board, visited, x, y, w, h) {
  const queue = [];

  visited[x][y] = true;
  queue.push([x, y]);

  while (queue.length) {
    const [curX, curY] = queue.shift();

    for (let i = 0; i < 8; i++) {
      const nx = curX + dx[i];
      const ny = curY + dy[i];

      if (isGoodToGo(board, visited, nx, ny, w, h)) {
        visited[nx][ny] = true;
        queue.push([nx, ny]);
      }
    }
  }
}

function isGoodToGo(board, visited, x, y, w, h) {
  return (
    0 <= x && x < h && 0 <= y && y < w && !visited[x][y] && board[x][y] === LAND
  );
}
