const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const N = Number(fs.readFileSync(filePath).toString().trim());
const board = Array.from({ length: N }, () =>
  Array.from({ length: N }).fill(' ')
);

fillBoard(board, 0, N - 1, 0, N - 1, N);
printBoard(board);

function fillBoard(board, xStart, xEnd, yStart, yEnd, n) {
  if (n === 1) {
    board[yStart][xStart] = '*';
    return;
  }

  const offset = n / 3;
  const xCenter = xStart + offset;
  const yCenter = yStart + offset;

  for (let y = yStart; y <= yEnd; y += offset) {
    for (let x = xStart; x <= xEnd; x += offset) {
      if (x === xCenter && y === yCenter) continue;
      fillBoard(board, x, x + offset - 1, y, y + offset - 1, offset);
    }
  }
}

function printBoard(board) {
  console.log(board.map(line => line.join('')).join('\n'));
}
