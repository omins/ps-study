const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const tc = Number(input[0]);
const dp = new Array(101).fill(0);
const nArr = [];
for (let i = 1; i <= tc; i++) {
  nArr.push(Number(input[i]));
}

// dp 테이블 초기 값 설정
dp[0] = 1;
dp[1] = 1;
dp[2] = 1;

// 점화식
for (let i = 3; i <= 100; i++) {
  dp[i] = dp[i - 2] + dp[i - 3];
}

for (let n of nArr) {
  console.log(dp[n - 1]);
}
