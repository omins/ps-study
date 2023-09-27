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
        if (left[0] < right[0]) result.push(left.shift());
        else result.push(right.shift());
    }
    while (left.length) result.push(left.shift());
    while (right.length) result.push(right.shift());
    return result;
}

const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const n = Number(input.shift());
const arr = input.map(Number);
// const sorted = mergeSort(arr); // 병합정렬 사용시 시간초과
const sorted = arr.sort((a, b) => a - b);

function average(arr, n) {
    let sum = arr.reduce((acc, cur) => acc + cur, 0);
    if (Math.round(sum / n) === -0) console.log(0);
    else console.log(Math.round(sum / n));
}

function center(arr) {
    console.log(arr[Math.floor(arr.length / 2)]);
}

function count(arr) {
    const map = new Map();
    for (let x of arr) {
        if (!map.has(x)) {
            map.set(x, 1);
        } else map.set(x, map.get(x) + 1);
    }
    let max = 1;
    let maxArr = [];
    map.forEach((e, k) => {
        if (max < e) {
            max = e;
            maxArr = [];
            maxArr.push(k);
        } else if (max === map.get(k)) maxArr.push(k);
    })
    return maxArr.length === 1 ? console.log(maxArr[0]) : console.log(maxArr[1]);
}

function range(arr) {
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    console.log(max - min);
}

average(sorted, n);
center(sorted);
count(sorted);
range(sorted);