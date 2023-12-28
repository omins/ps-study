const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filepath).toString().trim().split('\n');
const sortedArr = sort(
  input[1]
    .toString()
    .trim()
    .split(' ')
    .map(el => Number(el))
);

const center = getCenterIdx(sortedArr);
console.log(sortedArr[center]);

function sort(arr) {
  if (arr.length <= 1) return arr;

  const center = getCenterIdx(arr);
  const left = sort(arr.slice(0, center + 1));
  const right = sort(arr.slice(center + 1));

  return merge(left, right);
}

function merge(left, right) {
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

  return;
}

function getCenterIdx(arr) {
  return Math.floor((arr.length - 1) / 2);
}
