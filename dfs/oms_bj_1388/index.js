const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const [nm, ...arr] = fs.readFileSync(filepath).toString().trim().split("\n");
const [n, m] = nm.split(" ").map(e => +e);
const graph = arr.map(e => e.split(""));
let cnt = 0;

// 가로 먼저 탐색
for (let i = 0; i < n; i++) {
    let flag = true;
    for (let j = 0; j < m; j++) {
        if (flag && graph[i][j] === "-") {
            cnt++;
            flag = false;
        } else if (graph[i][j] === "|") flag = true;
    }
}

// 세로 먼저 탐색
for (let j = 0; j < m; j++) {
    let flag = true;
    for (let i = 0; i < n; i++) {
        if (flag && graph[i][j] === "|") {
            cnt++;
            flag = false;
        } else if (graph[i][j] === "-") flag = true;
    }
}

console.log(cnt);