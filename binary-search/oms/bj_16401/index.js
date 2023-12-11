const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const [m, n] = input[0].split(" ").map(Number);
const arr = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
let min = 1;
let max = Math.max(...arr);
let result = 0;

while (min <= max) {
  let cnt = 0;
  const mid = Math.floor((min + max) / 2);

  for (let snack of arr) {
    cnt += Math.floor(snack / mid);
  }

  if (cnt >= m) {
    result = mid;
    min = mid + 1;
  } else {
    max = mid - 1;
  }
}

console.log(result);
