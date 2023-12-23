const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");
const n = Number(input[0]);
const liquid = input[1].split(" ").map(Number);
let gap = 2000000000;
let start = 0;
let end = n - 1;
const answer = Array.from({ length: 2 }, (v) => 0);

while (start < end) {
  const cur = liquid[start] + liquid[end];

  if (Math.abs(cur) < gap) {
    gap = Math.abs(cur);
    answer[0] = liquid[start];
    answer[1] = liquid[end];
  }

  if (cur < 0) {
    start += 1;
  } else {
    end -= 1;
  }
}

console.log(answer.join(" "));
