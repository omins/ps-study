function dfs(x, y, visited) {
    visited[x][y] = true;

    for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (nx >= 0 && nx < N && ny >= 0 && ny < N && !visited[nx][ny] && graph[nx][ny] > rainHeight) dfs(nx, ny, visited);
    }
}

const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const N = Number(input[0]);
const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];
const graph = [];
let rainHeight = 0;
let maxSafeZone = 1;

for (let i = 1; i <= N; i++) {
    rainHeight = Math.max(rainHeight, ...input[i].split(" ").map(Number));
    graph.push(input[i].split(" ").map(Number));  
} 

while (rainHeight > 0) {
    let cnt = 0;
    const visited = Array.from(Array(N), () => Array(N).fill(false));


    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (graph[i][j] > rainHeight && !visited[i][j]) {
                dfs(i, j, visited);
                cnt++;
            }
        }
    }

    maxSafeZone = Math.max(maxSafeZone, cnt);
    rainHeight--;
}

console.log(maxSafeZone);