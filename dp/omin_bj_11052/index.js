const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [n, rest] = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(n);
const packCosts = rest.split(' ').map(Number);

const memo = new Map();
let maxCost = -Infinity;

packCosts.forEach((_, idx, origin) => {
  const packNumber = idx + 1;
  const cost = calculateCost(packNumber, packNumber, origin, memo, N);
  maxCost = Math.max(maxCost, cost);
});

console.log(maxCost);

function calculateCost(sumOfPack, packNumber, packCosts, memo, N) {
  const key = `${sumOfPack},${packNumber}`;
  if (memo.has(key)) return memo.get(key);

  const packCost = packCosts[packNumber - 1];
  if (sumOfPack === N) {
    memo.set(key, packCost);
    return packCost;
  }

  let localMax = -Infinity;

  for (let i = 1; i <= N - sumOfPack; i++) {
    const childCost = calculateCost(sumOfPack + i, i, packCosts, memo, N);
    localMax = Math.max(localMax, packCost + childCost);
  }

  memo.set(key, localMax);
  return localMax;
}
