const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filepath).toString().trim().split('\n');

input.shift();

const set = new Set(input);
const words = Array.from(set);

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
    if (isLeftWordSmallerThanRight(left[leftIdx], right[rightIdx])) {
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

const isLeftWordSmallerThanRight = (left, right) => {
  if (
    left.length < right.length ||
    (left.length === right.length && left < right)
  ) {
    return true;
  } else {
    return false;
  }
};

const sortedWords = sort(words);
const answer = sortedWords.join('\n');

console.log(answer);
