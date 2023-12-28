const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [_, inputs] = fs.readFileSync(filePath).toString().trim().split('\n');
const numbers = inputs.split(' ').map(Number);

const cache = new Map();
cache.set(0, numbers[0]);

for (let i = 1; i < numbers.length; i++) {
  let maxValue = 0;

  for (let j = 0; j < i; j++) {
    if (numbers[j] >= numbers[i]) continue;
    const cachedValue = cache.get(j);
    maxValue = Math.max(numbers[i] + cachedValue, maxValue);
  }

  cache.set(i, maxValue || numbers[i]);
}

console.log(Math.max(...cache.values()));
