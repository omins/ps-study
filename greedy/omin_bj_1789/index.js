const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const S = Number(fs.readFileSync(filepath).toString().trim());

let answer = 0;
let N = 0;

while (answer < S) {
  N++;
  answer += N;
}

if (answer > S) {
  N--;
}

console.log(N);
