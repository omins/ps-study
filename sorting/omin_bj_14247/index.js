const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filepath).toString().trim().split('\n');

const treesBeforeSort = input[1].split(' ').map(el => Number(el));
const speedsBeforeSort = input[2].split(' ').map(el => Number(el));

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
const trees = [];
let answer = 0;

for (let i = 0; i < speeds.length; i++) {
  const idxBeforeSort = speedsBeforeSort.indexOf(speeds[i]);
  trees.push(treesBeforeSort[idxBeforeSort]);
}

for (let i = 0; i < trees.length; i++) {
  answer += trees[i] + speeds[i] * i;
}

console.log(answer);
