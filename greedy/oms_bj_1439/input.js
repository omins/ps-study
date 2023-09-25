const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("");

let one = [];
let zero = [];
let sum = "";

for (let i = 0; i < input.length; i++) {
    if (input[i] === "1") {
        sum += input[i];
        if (input[i + 1] === "0" || input[i + 1] === undefined) {
            one.push(sum);
            sum = "";
        }
    } else {
        sum += input[i];
        if (input[i + 1] === "1" || input[i + 1] === undefined) {
            zero.push(sum);
            sum = "";
        }
    }
}

console.log(Math.min(one.length, zero.length));