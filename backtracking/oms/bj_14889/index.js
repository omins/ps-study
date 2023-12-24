const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const n = Number(input[0]);
const nums = [];
for (let i = 1; i <= n; i++) nums.push(i);
const status = [];
for (let i = 1; i <= n; i++) status.push(input[i].split(" ").map(Number));

// 1차 시도 시간초과
// const visited = new Array(n + 1).fill(false);
// let gap = 10000;

// function backtracking(arr, depth, start) {
//     if (depth === n / 2) {
//         const teamA = [];
//         const teamB = [];
//         for (let i = 1; i <= n; i++) {
//             if (visited[i]) teamA.push(i);
//             else teamB.push(i);
//         }
//         let aStat = statCheck(teamA);
//         let bStat = statCheck(teamB);
//         gap = Math.min(gap, Math.abs(aStat - bStat));
//     }
//     for (let i = start; i < arr.length; i++) {
//         if (visited[i]) continue;
//         visited[i] = true;
//         backtracking(arr, depth + 1, start + 1);
//         visited[i] = false;
//     }
// }

// function statCheck(arr) {
//     let totalStat = 0;
//     const v = new Array(arr.length).fill(false);
//     for (let i = 0; i < arr.length; i++) {
//         v[i] = true;
//         const other = [];
//         for (let j = 0; j < arr.length; j++) {
//             if (v[j]) continue;
//             other.push(arr[j]);
//         }
//         for (let x of other) totalStat += status[arr[i]][x - 1];
//         v[i] = false;
//     }
//     return totalStat;
// }

// backtracking(nums, 0, 0);
// console.log(gap);

const getCombinations = function (arr, selectNum) {
    const result = [];
    if (selectNum === 1) return arr.map((e) => [e]);

    arr.forEach((fix, idx, origin) => {
        const rest = origin.slice(idx + 1);
        const combinations = getCombinations(rest, selectNum - 1);
        const connect = combinations.map((e) => [fix, ...e]);
        result.push(...connect);
    })
    return result;
}
const comb = getCombinations(nums, n / 2);
const center = comb.length / 2;
const teamAcomb = comb.slice(0, center);
const teamBcomb = comb.slice(center).reverse();

function getGap() {
    let gap = Infinity;
    for (let i = 0; i < teamAcomb.length; i++) {
        let aStat = 0;
        let bStat = 0;
        const teamA = teamAcomb[i];
        const teamB = teamBcomb[i];
        for (let j = 0; j < teamA.length; j++) {
            for (let x = 0; x < teamA.length; x++) {
                if (j === x) continue;
                aStat += status[teamA[j] - 1][teamA[x] - 1];
                bStat += status[teamB[j] - 1][teamB[x] - 1];
            }
        }
        let curGap = Math.abs(aStat - bStat);
        gap = Math.min(gap, curGap);
    }
    console.log(gap);
}

getGap();