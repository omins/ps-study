const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const price = Number(input[0]);
const coins = [500, 100, 50, 10, 5, 1];
let pay = 1000;
let cnt = 0;

let changes = pay - price;

for (let coin of coins) {
    if (coin > changes) continue;
    cnt += Math.floor(changes / coin);
    changes -= Math.floor(changes / coin) * coin;
}

console.log(cnt);