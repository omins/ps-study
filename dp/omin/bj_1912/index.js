const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [n, rest] = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(n);

const arr = rest.split(' ').map(Number);
const memo = Array.from({ length: N }).fill(null);

calculateGreatestSum(0, arr, memo);
console.log(Math.max(...memo));

function calculateGreatestSum(index, arr, memo) {
  if (memo[index] !== null) return memo[index];
  if (index === arr.length - 1) {
    memo[index] = arr[index];
    return arr[index];
  }

  let localMax = -Infinity;

  const childMax = calculateGreatestSum(index + 1, arr, memo);
  localMax = Math.max(localMax, arr[index], arr[index] + childMax);

  memo[index] = localMax;
  return localMax;
}
