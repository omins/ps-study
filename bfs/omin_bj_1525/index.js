const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';

const board = fs
  .readFileSync(filePath)
  .toString()
  .replace(/[\s\n]/g, '');

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];
const N = 3;
const M = 3;

const target = '123456780';

const step = getMinStepToAnswer(board, target);
console.log(step);

function getMinStepToAnswer(board, answer) {
  const visited = new Set();
  const queue = [];

  visited.add(board);
  queue.push([board, 0]);

  while (queue.length) {
    const [currentBoard, step] = queue.shift();

    if (currentBoard === answer) return step;

    const idx = currentBoard.indexOf('0');
    const curX = Math.floor(idx / N);
    const curY = idx % M;

    for (let i = 0; i < 4; i++) {
      const nx = curX + dx[i];
      const ny = curY + dy[i];

      if (!isGoodToGo(nx, ny)) continue;
      const newIdx = nx * N + ny;
      const newBoard = swap(currentBoard, idx, newIdx);

      if (visited.has(newBoard)) continue;

      visited.add(newBoard);
      queue.push([newBoard, step + 1]);
    }
  }

  return -1;
}

function isGoodToGo(x, y) {
  return x >= 0 && x < 3 && y >= 0 && y < 3;
}

function swap(board, current, move) {
  const newBoard = board.split('');
  newBoard[current] = newBoard[move];
  newBoard[move] = '0';

  return newBoard.join('');
}
