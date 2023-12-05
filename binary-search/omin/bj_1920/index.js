const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [, numbers, , targets] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const sortedNumbers = sort(numbers.split(' ').map(Number));
const answers = [];

targets
  .split(' ')
  .map(Number)
  .forEach(target => {
    const answer = hasTarget(sortedNumbers, target) ? 1 : 0;
    answers.push(answer);
  });

console.log(answers.join('\n'));

function sort(arr) {
  if (arr.length <= 1) return arr;

  const center = Math.round(arr.length / 2);
  const left = sort(arr.slice(0, center));
  const right = sort(arr.slice(center));

  return merge(left, right);
}

function merge(left, right) {
  let leftIdx = 0;
  let rightIdx = 0;
  const temp = [];

  while (leftIdx < left.length && rightIdx < right.length) {
    if (left[leftIdx] < right[rightIdx]) {
      temp.push(left[leftIdx++]);
    } else {
      temp.push(right[rightIdx++]);
    }
  }

  return temp.concat(left.slice(leftIdx), right.slice(rightIdx));
}

function hasTarget(arr, target) {
  let min = 0;
  let max = arr.length - 1;

  while (min <= max) {
    const center = Math.round((min + max) / 2);

    if (arr[center] === target) return true;
    if (arr[center] < target) {
      min = center + 1;
    } else {
      max = center - 1;
    }
  }

  return false;
}
