function mergeSort(arr) {
  if (arr.length < 2) return arr;
  let half = Math.floor(arr.length / 2);
  let left = arr.slice(0, half);
  let right = arr.slice(half, arr.length);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  const result = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  while (left.length) result.push(left.shift());
  while (right.length) result.push(right.shift());
  return result;
}

const input = require("fs")
  .readFileSync("./0920.txt")
  .toString()
  .trim()
  .split("\n");

const [n, k] = input[0].split(" ").map(Number);

const arr = input[1].split(" ").map(Number);

const sortedArr = mergeSort(arr);

console.log(sortedArr[n - k]);