const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filepath).toString().trim().split('\n');

const libraryBeforeSort = input[1].split(' ').map(el => Number(el));
const candidates = input[3].split(' ').map(el => Number(el));
const answers = [];

const search = function (arr, target, start, end) {
  if (start > end) {
    return false;
  }

  const center = Math.floor((start + end) / 2);

  if (arr[center] === target) return true;
  if (arr[center] > target) return search(arr, target, start, center - 1);
  else return search(arr, target, center + 1, end);
};

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
    if (isLeftSmallerThanRight(left[leftIdx], right[rightIdx])) {
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

const isLeftSmallerThanRight = (left, right) => {
  if (left < right) return true;
  return false;
};

const library = sort(libraryBeforeSort);
candidates.forEach(candidate => {
  const isExists = search(library, candidate, 0, library.length - 1);
  if (isExists) {
    answers.push('1');
  } else {
    answers.push('0');
  }
});

const answer = answers.join('\n');
console.log(answer);
