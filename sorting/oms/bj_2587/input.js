const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input =  fs.readFileSync(filepath).toString().trim().split("\n").map(Number);

let sum = input.reduce((acc, cur) => acc + cur, 0);
let avg = sum / 5;

const sorted = input.sort((a, b) => a - b);

console.log(avg);
console.log(sorted[2]);