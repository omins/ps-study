const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number).sort((a, b) => a - b);

const permutation = (arr, selectNum) => {
    const answer = new Set();
    const result = [];
    if (selectNum === 1) return arr.map((e) => [e]);

    arr.forEach((item, idx, origin) => {
        const remain = [...origin.slice(0, idx), ...origin.slice(idx + 1)];
        const recall = permutation(remain, selectNum - 1);
        const attach = recall.map((e) => [item, ...e]);

        result.push(...attach);
    });

    for (let x of result) {
        answer.add(x.join(" "));
    }
    return [...answer].join("\n");
}
permutation(nums, m);

console.log(permutation(nums, m));