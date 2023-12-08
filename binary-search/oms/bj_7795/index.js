const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");
const tc = Number(input[0]);
let line = 1;

function lowerBound(arr, t, s, e) {
  while (s < e) {
    const mid = parseInt((s + e) / 2);
    if (arr[mid] >= t) e = mid;
    else s = mid + 1;
  }
  return e;
}

function upperBound(arr, t, s, e) {
  while (s < e) {
    const mid = parseInt((s + e) / 2);
    if (arr[mid] > t) e = mid;
    else s = mid + 1;
  }
  return e;
}

function countByRange(arr, rightValue, leftValue) {
  const rightIndex = upperBound(arr, rightValue, 0, arr.length);
  const leftIndex = lowerBound(arr, leftValue, 0, arr.length);
  return rightIndex - leftIndex;
}

for (let i = 0; i < tc; i++) {
  let result = 0;
  const arrA = input[line + 1].split(" ").map(Number);
  const arrB = input[line + 2]
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);

  arrA.forEach((num) => {
    const cur = countByRange(arrB, num - 1, 0);
    result += cur;
  });
  console.log(result);
  line += 3;
}
