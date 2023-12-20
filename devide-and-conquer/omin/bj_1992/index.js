const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [N, ...rest] = fs.readFileSync(filePath).toString().trim().split('\n');
const board = rest.map(line => line.split('').map(Number));

console.log(compress(board, 0, N - 1, 0, N - 1));

function compress(board, xStart, xEnd, yStart, yEnd) {
  if (isCompressible(board, xStart, xEnd, yStart, yEnd)) {
    return String(board[yStart][xStart]);
  }

  const xCenter = getCenter(xStart, xEnd);
  const yCenter = getCenter(yStart, yEnd);

  const first = compress(board, xStart, xCenter, yStart, yCenter);
  const second = compress(board, xCenter + 1, xEnd, yStart, yCenter);
  const third = compress(board, xStart, xCenter, yCenter + 1, yEnd);
  const fourth = compress(board, xCenter + 1, xEnd, yCenter + 1, yEnd);

  return `(${first}${second}${third}${fourth})`;
}

function isCompressible(board, xStart, xEnd, yStart, yEnd) {
  let digit = board[yStart][xStart];

  for (let i = yStart; i <= yEnd; i++) {
    for (let j = xStart; j <= xEnd; j++) {
      if (board[i][j] !== digit) return false;
    }
  }

  return true;
}

function getCenter(start, end) {
  return Math.floor((start + end) / 2);
}
