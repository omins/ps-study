const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number).sort((a, b) => a - b);
let answer = "";

const getCombination = (arr, selectNum) => {
    const result = [];
    if (selectNum === 1) return arr.map((e) => [e]);

    arr.forEach((item, idx, origin) => {
        const remain = origin.slice(idx);
        const recall = getCombination(remain, selectNum - 1);
        const attach = recall.map((e) => [item, ...e]);

        result.push(...attach);
    });
    return result;
}

const allComb = getCombination(nums, m);

allComb.map((e) => {
    answer += e.join(" ") + "\n";
});

console.log(answer);