const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';

const input = fs.readFileSync(filepath).toString().trim().split('\n');
const [N, S] = input[0].split(' ').map(el => Number(el));
const seq = input[1].split(' ').map(el => Number(el));

let answer = 0;
combination([], 0);

console.log(answer);

function combination(array, idx) {
  const sum = array.reduce((a, b) => a + b, null);

  if (sum === S) {
    answer++;
  }

  for (let i = idx; i < N; i++) {
    array.push(seq[i]);
    combination(array, i + 1);
    array.pop();
  }
}
