const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filepath).toString().trim().split('\n');
const tc = input.slice(0, input.length - 1).map(el =>
  el
    .trim()
    .split(' ')
    .slice(1)
    .map(el => Number(el))
);

const PICK_NUM = 6;

for (let i = 0; i < tc.length; i++) {
  const combinations = getCombinations(tc[i], PICK_NUM);
  const answer = combinations
    .map(combination => combination.join(' '))
    .join('\n');

  console.log(answer);

  if (!isLastTestCase(i, tc.length)) {
    splitTestCase();
  }
}

function getCombinations(arr, r) {
  if (r === 1) {
    return arr;
  }

  const result = [];

  for (let i = 0; i <= arr.length - r; i++) {
    const head = [arr[i]];
    const tail = getCombinations(arr.slice(i + 1), r - 1);

    for (let j = 0; j < tail.length; j++) {
      const concat = head.concat(tail[j]);
      result.push(concat);
    }
  }

  return result;
}

function splitTestCase() {
  console.log();
}

function isLastTestCase(idx, length) {
  return idx === length - 1;
}
