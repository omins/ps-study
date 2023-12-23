const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [S, N, K, y1, y2, x1, x2] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const answer = [];
const width = Math.pow(N, S);

for (let y = y1; y <= y2; y++) {
  const row = [];

  for (let x = x1; x <= x2; x++) {
    const col = getColor(x, y, N, K, width);
    row.push(col);
  }

  answer.push(row);
}

printAnswer(answer);

function getColor(x, y, n, k, width) {
  if (width === 1) return 0;

  const prevWidth = Math.floor(width / n);
  const blackStart = Math.floor(((n - k) / 2) * prevWidth);

  if (isBlack(x, y, width, blackStart)) return 1;

  return getColor(x % prevWidth, y % prevWidth, n, k, prevWidth);
}

function isBlack(x, y, width, blackStart) {
  return (
    x >= blackStart &&
    x < width - blackStart &&
    y >= blackStart &&
    y < width - blackStart
  );
}

function printAnswer(answer) {
  console.log(answer.map(row => row.join('')).join('\n'));
}
