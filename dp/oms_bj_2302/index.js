const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const n = Number(input[0]);
const m = Number(input[1]);

// 피보나치 수열
const d = new Array(n + 1).fill(0);
d[0] = 1;
d[1] = 1;
d[2] = 2;

function dp(x) {
  if (d[x] !== 0) {
    return d[x];
  }
  d[x] = dp(x - 1) + dp(x - 2);
  return d[x];
}

// vip석을 기준으로 나누었을 때 각 좌석의 개수 구하기
const arr = [];
let start = 0;

for (let i = 2; i < m + 2; i++) {
  end = Number(input[i]);
  arr.push(end - 1 - start);
  start = end;
}
arr.push(n - start);

// 최종 정답 구하기
let answer = 1;
for (let x of arr) {
  answer *= dp(x);
}

console.log(answer);
