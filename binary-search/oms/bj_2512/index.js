const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const n = Number(input[0]);
const arr = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
const totalMoney = Number(input[2]);
let start = 1;
let end = Math.max(...arr);
let answer = 0;

while (start <= end) {
  let cur = 0;
  const mid = parseInt((start + end) / 2);

  for (let x of arr) {
    cur += Math.min(mid, x);
  }

  if (cur <= totalMoney) {
    answer = mid;
    start = mid + 1;
  } else {
    end = mid - 1;
  }
}

console.log(answer);
