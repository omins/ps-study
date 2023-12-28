const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filepath).toString().trim().split('\n');

const N = Number(input[0]);
const trees = input[1]
  .trim()
  .split(' ')
  .map(el => Number(el));
const speedsBeforeSort = input[2]
  .trim()
  .split(' ')
  .map(el => Number(el));

const sort = arr => {
  if (arr.length <= 1) return arr;

  const center = Math.floor(arr.length / 2);
  const left = sort(arr.slice(0, center));
  const right = sort(arr.slice(center));

  return merge(left, right);
};

const merge = (left, right) => {
  const temp = [];
  let leftIdx = 0;
  let rightIdx = 0;

  while (leftIdx < left.length && rightIdx < right.length) {
    if (left[leftIdx] < right[rightIdx]) {
      temp.push(left[leftIdx]);
      leftIdx++;
    } else {
      temp.push(right[rightIdx]);
      rightIdx++;
    }
  }

  const result = temp.concat(left.slice(leftIdx), right.slice(rightIdx));
  return result;
};

const speeds = sort(speedsBeforeSort);
let answer = 0;

answer = trees.reduce((a, b) => a + b, 0);

for (let i = 0; i < N; i++) {
  answer += speeds[i] * i;
}

console.log(answer);
