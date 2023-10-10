const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number).sort((a, b) => a - b);

const visited = new Array(n).fill(false);
const selected = [];
let answer = "";

function backtracking(arr, depth) {
    if (depth === m) {
        const result = [];
        for (let x of selected) result.push(x);
        answer += `${result.join(" ")}${"\n"}`;
    }
    for (let i = 0; i < arr.length; i++) {
        if (visited[i]) continue;
        visited[i] = true;
        selected.push(arr[i]);
        backtracking(arr, depth + 1);
        visited[i] = false;
        selected.pop();
    }
}

backtracking(nums, 0);

console.log(answer);