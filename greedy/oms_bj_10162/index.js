const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n").map(Number);

let t = input[0];
const nums = [300, 60, 10];
const cnt = [0, 0, 0];

for (let i = 0; i < nums.length; i++) {
    if (nums[i] > t) continue;
    cnt[i] = Math.floor(t / nums[i]);
    t -= nums[i] * cnt[i];
}
if (t === 0) console.log(cnt.join(" "));
else console.log(-1);