const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

let changes = Number(input[0]);
let cnt = 0;
while (changes > 0) {
    if (changes === 1 || changes === 3) {
        cnt = -1;
        break;
    } 
    if (changes % 5 !== 0) {
        changes -= 2;
        cnt++;
    } 
    else if (changes % 5 === 0) {
        let c = Math.floor(changes / 5);
        changes -= c * 5;
        cnt += c;
    }
}

console.log(cnt);