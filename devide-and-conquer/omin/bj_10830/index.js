const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [NM, ...rest] = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = NM.split(' ').map(Number);
const MOD = 1000;
const board = rest.map(line => line.split(' ').map(elem => Number(elem) % MOD));

const matrix = powerMatrix(board, M);
printMatrix(matrix);

function powerMatrix(matrix, exponent) {
  if (exponent === 1) {
    return matrix;
  }

  const logMatrix = powerMatrix(matrix, Math.floor(exponent / 2));

  if (exponent % 2 === 0) {
    return multiplyMatrix(logMatrix, logMatrix);
  } else {
    return multiplyMatrix(multiplyMatrix(logMatrix, logMatrix), matrix);
  }
}

function multiplyMatrix(A, B) {
  const result = Array.from({ length: N }, () =>
    Array.from({ length: N }).fill(0)
  );

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      for (let k = 0; k < N; k++) {
        result[i][j] += A[i][k] * B[k][j];
      }

      result[i][j] %= MOD;
    }
  }

  return result;
}

function printMatrix(matrix) {
  matrix.forEach(line => {
    console.log(line.join(' '));
  });
}
