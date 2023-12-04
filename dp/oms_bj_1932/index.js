const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const n = Number(input.shift());
const dp = [];

for (let i = 0; i < n; i++) {
  dp.push(input[i].split(" ").map(Number));
}

for (let i = 1; i < n; i++) {
  for (let j = 0; j <= i; j++) {
    let a = 0;
    let b = 0;

    // if (j !== 0) {
    //   a = dp[i - 1][j - 1];
    // }
    // if (j !== i) {
    //   b = dp[i - 1][j];
    // }

    // dp[i][j] = dp[i][j] + Math.max(a, b);

    if (j !== 0) {
      a = dp[i - 1][j - 1] + dp[i][j];
    }
    if (j !== i) {
      b = dp[i - 1][j] + dp[i][j];
    }

    dp[i][j] = Math.max(a, b);
  }
}

console.log(dp);
console.log(Math.max(...dp[n - 1]));
