function dfs(cur) {
    visited[cur] = true;
    cnt++;
    const path = connections[cur];
    for (let i = 0; i < path.length; i++) {
        if (visited[path[i]]) continue;
        dfs(path[i]);
    }
}

const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");
const N = Number(input[0]);
const pairs = Number(input[1]);
const connections = [];
for (let i = 0; i < N + 1; i++) connections.push([]);
for (let i = 2; i <= pairs + 1; i++) {
    const [a, b] = input[i].split(" ").map(Number);
    connections[a].push(b);
    connections[b].push(a);
}
const visited = new Array(N + 1).fill(false);
let cnt = 0;

dfs(1);
console.log(cnt - 1);