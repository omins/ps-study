const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [NH, ...rest] = fs.readFileSync(filePath).toString().trim().split('\n');
const [_, H] = NH.split(' ').map(Number);

let rockBelow = [];
let rockAbove = [];

rest.forEach((rock, idx) => {
  if (idx % 2 === 0) {
    rockBelow.push(Number(rock));
  } else {
    rockAbove.push(Number(rock));
  }
});

rockBelow = sort(rockBelow);
rockAbove = sort(rockAbove);

let count = 0;
let minValue = Infinity;

for (let i = 1; i <= H; i++) {
  const cutBelow = rockBelow.length - indexOfUpperBound(rockBelow, i - 1);
  const cutAbove = rockAbove.length - indexOfUpperBound(rockAbove, H - i);
  const sum = cutBelow + cutAbove;

  if (sum < minValue) {
    minValue = sum;
    count = 1;
  } else if (minValue === sum) {
    count++;
  }
}

console.log(minValue, count);

function indexOfUpperBound(arr, target) {
  let start = 0;
  let end = arr.length;

  while (start < end) {
    const mid = Math.floor((start + end) / 2);

    if (arr[mid] <= target) {
      start = mid + 1;
    } else {
      end = mid;
    }
  }

  return end;
}

function sort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = sort(arr.slice(0, mid));
  const right = sort(arr.slice(mid));

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
