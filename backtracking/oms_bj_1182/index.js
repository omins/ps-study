const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const [n, s] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number);

const visited = new Array(n).fill(false);
const selected = [];
let cnt = 0;

function backtracking(start) {
    if (selected.length > 0) {
        const result = [];
        for (let x of selected) result.push(x);
        const curNum = result.reduce((acc, cur) => acc + cur , 0);
        if (curNum === s) cnt++;
    }
    for (let i = start; i < n; i++) {
        if (visited[i]) continue;
        visited[i] = true;
        selected.push(nums[i]);
        backtracking(i + 1);
        visited[i] = false;
        selected.pop();
    }
}

backtracking(0);
console.log(cnt);