const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n").map(Number);

const n = Number(input.shift());
let max = 0;

input.sort((a, b) => a - b);

for (let i = 0; i < n; i++) {
    max = Math.max(max, (input[i] * (n - i)));
}
console.log(max);