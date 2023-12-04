const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [n, rest] = fs.readFileSync(filePath).toString().trim().split('\n');
const packCosts = rest.split(' ').map(Number);

const maxValues = new Map();
maxValues.set(0, packCosts[0]);

for (let i = 1; i < packCosts.length; i++) {
  let currentMaxValue = packCosts[i];

  for (let j = 1; j <= Math.round(i / 2); j++) {
    const calculatedValue = maxValues.get(i - j) + maxValues.get(j - 1);
    currentMaxValue = Math.max(currentMaxValue, calculatedValue);
  }

  maxValues.set(i, currentMaxValue);
}

console.log(maxValues.get(Number(n) - 1));
