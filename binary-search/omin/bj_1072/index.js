const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [X, Y] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const MAX = 1_000_000_000;

let answer = -1;
let start = 0;
let end = MAX;
let base = getPercent(X, Y);

while (start <= end) {
  let center = Math.floor((start + end) / 2);
  const x = X + center;
  const y = Y + center;

  const result = getPercent(x, y);

  if (result <= base) {
    start = center + 1;
  } else {
    answer = center;
    end = center - 1;
  }
}

console.log(answer);

function getPercent(x, y) {
  return Math.floor((y * 100) / x);
}
