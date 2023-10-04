const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [N, M] = fs
  .readFileSync(filepath)
  .toString()
  .trim()
  .split(' ')
  .map(el => Number(el));

const arr = [];
for (let i = 1; i <= N; i++) {
  arr.push(i);
}

const results = permutation(arr, M);
const answer = results.map(result => result.join(' ')).join('\n');

console.log(answer);

function permutation(arr, num) {
  const res = [];
  if (num === 1) return arr.map(v => [v]);

  arr.forEach((v, idx, arr) => {
    const rest = [...arr.slice(0, idx), ...arr.slice(idx + 1)];
    const permutations = permutation(rest, num - 1);
    const attach = permutations.map(permutation => [v, ...permutation]);
    res.push(...attach);
  });

  return res;
}
