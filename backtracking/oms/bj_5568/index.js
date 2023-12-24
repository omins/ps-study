const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const n = Number(input[0]);
const k = Number(input[1]);
const cards = [];
for (let i = 2; i <= n + 1; i++) cards.push(Number(input[i]));
const nums = new Set();
const visited = new Array(n).fill(false);
const selected = [];

function backTracking(arr, depth) {
    if (depth === k) {
        const result = [];
        for (let x of selected) result.push(x);
        const num = result.join("");
        nums.add(Number(num));
    }
    for (let i = 0; i < arr.length; i++) {
        if (visited[i]) continue;
        visited[i] = true;
        selected.push(arr[i]);
        backTracking(arr, depth + 1);
        visited[i] = false;
        selected.pop();
    }
}

backTracking(cards, 0);

console.log(nums.size);