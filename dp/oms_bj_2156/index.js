const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const n = Number(input[0]);
const dp = new Array(n).fill(0);
const wineArr = [];

for (let i = 1; i <= n; i++) {
  wineArr.push(Number(input[i]));
}

// dp 테이블 초기값 설정
dp[0] = wineArr[0];
dp[1] = wineArr[0] + wineArr[1];
dp[2] = Math.max(
  wineArr[0] + wineArr[1],
  wineArr[0] + wineArr[2],
  wineArr[1] + wineArr[2]
);

// 점화식
for (let i = 3; i < n; i++) {
  // i번째 와인을 안마시는 경우
  dp[i] = dp[i - 1];
  // i번째 와인을 마시는 경우
  dp[i] = Math.max(dp[i], dp[i - 2] + wineArr[i]);
  dp[i] = Math.max(dp[i], wineArr[i - 1] + wineArr[i] + dp[i - 3]);
}

console.log(dp[n - 1]);
