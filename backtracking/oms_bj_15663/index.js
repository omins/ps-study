const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number).sort((a, b) => a - b);

// 1차 시도
// const answer = new Set();

// const permutation = (arr, selectNum) => {
//     const result = [];
//     if (selectNum === 1) return arr.map((e) => [e]);

//     arr.forEach((item, idx, origin) => {
//         const remain = [...origin.slice(0, idx), ...origin.slice(idx + 1)];
//         const recall = permutation(remain, selectNum - 1);
//         const attach = recall.map((e) => [item, ...e]);

//         result.push(...attach);
//     });

//     return result;
// }

// const per = permutation(nums, m);

// for (let x of per) {
//     answer.add(x.join(" "));
// }

// console.log([...answer].join("\n"));

// 2차시도
const visited = new Array(n).fill(false);
const selected = [];
const answer = new Set();

const backtracking = (depth) => {
    if (depth === m) {
        answer.add(selected.join(" "));
    }
    for (let i = 0; i < n; i++) {
        if (visited[i]) continue;
        visited[i] = true;
        selected.push(nums[i]);
        backtracking(depth + 1);
        visited[i] = false;
        selected.pop();
    }
}
backtracking(0);
console.log([...answer].join("\n"));