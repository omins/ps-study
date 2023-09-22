const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

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

const arr = [...new Set(input[1].split(" ").map(Number))];

const sorted = mergeSort(arr);

// let answer = "";

// sorted.forEach(e => {
//     answer += `${e} `;
// });

// console.log(answer);
console.log(sorted.join(" "));