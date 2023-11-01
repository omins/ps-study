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
