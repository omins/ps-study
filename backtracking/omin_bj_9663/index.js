const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';

const N = Number(fs.readFileSync(filepath).toString().trim());
let answer = 0;
const numDiagonals = 2 * N - 1;

const col = Array(N).fill(false);
const leftDiagonal = Array(numDiagonals).fill(false);
const rightDiagonal = Array(numDiagonals).fill(false);

function dfs(row) {
  if (row === N) {
    answer++;
    return;
  }

  for (let colIndex = 0; colIndex < N; colIndex++) {
    // Indices which diagonal the current position is on
    const leftDiagonalIndex = row + colIndex;
    const rightDiagonalIndex = row - colIndex + N - 1;

    if (
      col[colIndex] ||
      leftDiagonal[leftDiagonalIndex] ||
      rightDiagonal[rightDiagonalIndex]
    ) {
      continue;
    }

    col[colIndex] = true;
    leftDiagonal[leftDiagonalIndex] = true;
    rightDiagonal[rightDiagonalIndex] = true;

    dfs(row + 1);

    col[colIndex] = false;
    leftDiagonal[leftDiagonalIndex] = false;
    rightDiagonal[rightDiagonalIndex] = false;
  }
}

dfs(0);

console.log(answer);
