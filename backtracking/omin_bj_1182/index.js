const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';

const input = fs.readFileSync(filepath).toString().trim().split('\n');
const [N, S] = input[0].split(' ').map(el => Number(el));
const seq = input[1].split(' ').map(el => Number(el));

solution();

function solution() {
  let answer = 0;

  for (let i = 1; i <= N; i++) {
    const combinations = getCombinations(seq, i);
    combinations.forEach(combination => {
      const sum = combination.reduce((a, b) => a + b, 0);
      if (sum === S) {
        answer += 1;
      }
    });
  }

  console.log(answer);
}

function getCombinations(arr, r) {
  const result = [];

  if (r === 1) return arr.map(el => [el]);

  arr.forEach((fixed, idx, origin) => {
    const rest = origin.slice(idx + 1);
    const combinations = getCombinations(rest, r - 1);
    const attached = combinations.map(combination => [fixed, ...combination]);

    result.push(...attached);
  });

  return result;
}
