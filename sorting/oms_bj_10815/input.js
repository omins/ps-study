// mergeSort
function mergeSort(arr) {
    if (arr.length < 2) return arr;
    const half = Math.floor(arr.length / 2);
    const left = arr.slice(0, half);
    const right = arr.slice(half, arr.length);
    return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right) {
    const result = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    while (left.length) result.push(left.shift());
    while (right.length) result.push(right.shift());
    return result;
}
// binarySearch
function binary(arr, target, start, end) {
    if (start > end) return false;

    const mid = Math.floor((start + end) / 2);

    if (arr[mid] === target) return true;
    if (arr[mid] > target) return binary(arr, target, start, mid - 1);
    else return binary(arr, target, mid + 1, end);
};

const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// 시간초과 
// const nArr = mergeSort([...new Set(input[1].split(" ").map(Number))]);
// const mArr = input[3].split(" ").map(Number);

// const answer = [];

// mArr.forEach(m => {
//     const isTrue = binary(nArr, m, 0, nArr.length -1);
//     if (isTrue) answer.push(1);
//     else answer.push(0);
// })

// set 을 이용해서 재시도

const nArr = new Set(input[1].split(" ").map(Number));
const mArr = input[3].split(" ").map(Number);
const answer = [];

mArr.forEach(m => {
    if (nArr.has(m)) answer.push(1);
    else answer.push(0);
});
console.log(answer.join(" "));