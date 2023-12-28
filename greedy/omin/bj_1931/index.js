const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filepath).toString().trim().split('\n');

const arr = input.slice(1).map(el => {
  const [start, end] = el.trim().split(' ');
  const numStart = Number(start);
  const numEnd = Number(end);
  const distance = Math.abs(numStart - numEnd);

  const distanceFromZero = numStart + distance;
  return [numStart, numEnd, distanceFromZero];
});

const sortedArr = sort(arr);
locate();

function locate() {
  let answer = 0;
  let cur = 0;

  for (let i = 0; i < sortedArr.length; i++) {
    const [start, end, _] = sortedArr[i];

    if (cur <= start) {
      answer += 1;
      cur = end;
    }
  }

  console.log(answer);
}

function sort(arr) {
  if (arr.length <= 1) return arr;
  const center = Math.floor(arr.length / 2);
  const left = sort(arr.slice(0, center));
  const right = sort(arr.slice(center));

  return merge(left, right);
}

function merge(left, right) {
  const temp = [];
  let leftIdx = 0;
  let rightIdx = 0;

  while (leftIdx < left.length && rightIdx < right.length) {
    const leftDist = left[leftIdx][2];
    const rightDist = right[rightIdx][2];
    const leftStart = left[leftIdx][0];
    const rightStart = right[rightIdx][0];

    if (
      leftDist < rightDist ||
      (leftDist === rightDist && leftStart < rightStart)
    ) {
      temp.push(left[leftIdx]);
      leftIdx++;
    } else {
      temp.push(right[rightIdx]);
      rightIdx++;
    }
  }

  return temp.concat(left.slice(leftIdx), right.slice(rightIdx));
}
