const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");
const n = Number(input[0]);
const dp = [];

for (let i = 1; i <= n; i++) {
  dp.push(Number(input[i]));
}

for (let i = 1; i < n; i++) {
  dp[i] = Math.max(dp[i], dp[i] * dp[i - 1]);
}

console.log(Math.max(...dp).toFixed(3));
