const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filepath).toString().trim().split('\n');

let answer = 0;
const inputToSort = input.slice(1).map(tip => Number(tip));

const tipsWillingToPay = sort(inputToSort);
tipsWillingToPay.forEach(calculateFinalTip);

console.log(answer);

function calculateFinalTip(tip, idx) {
  const result = tip - idx;

  if (result > 0) {
    answer += result;
  }
}

function sort(arr) {
  if (arr.length <= 1) return arr;

  const center = Math.floor(arr.length / 2);
  const left = sort(arr.slice(center));
  const right = sort(arr.slice(0, center));

  return merge(left, right);
}

function merge(left, right) {
  const temp = [];
  let leftIdx = 0;
  let rightIdx = 0;

  while (leftIdx < left.length && rightIdx < right.length) {
    if (left[leftIdx] > right[rightIdx]) {
      temp.push(left[leftIdx]);
      leftIdx++;
    } else {
      temp.push(right[rightIdx]);
      rightIdx++;
    }
  }

  return temp.concat(left.slice(leftIdx), right.slice(rightIdx));
}
