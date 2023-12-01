const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = Number(fs.readFileSync(filePath).toString());

console.log(fibonacci(input));

function fibonacci(n) {
  const cache = new Map();
  cache.set(0, 1);
  cache.set(1, 1);

  for (let i = 2; i <= n; i++) {
    const oneBefore = cache.get(i - 1);
    const twoBefore = cache.get(i - 2);
    const current = oneBefore + twoBefore;
    cache.set(i, current % 15746);
  }

  return cache.get(n);
}
