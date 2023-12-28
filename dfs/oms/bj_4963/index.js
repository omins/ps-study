function dfs(graph, x, y) {
    const h = graph.length;
    const w = graph[0].length;
    graph[x][y] = 0;
    for (let i = 0; i < 8; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (nx >= 0 && nx < h && ny >= 0 && ny < w && graph[nx][ny] === 1) dfs(graph, nx, ny);
    }
}

const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

let line = 0;
const dx = [1, -1, 0, 0, 1, -1, 1, -1];
const dy = [0, 0, 1, -1, 1, 1, -1, -1];

let answer = "";

while (line < input.length) {
    let cnt = 0;
    const [W, H] = input[line].split(" ").map(Number);
    if (W === 0 && H === 0) break;
    line++;
    const graph = [];
    for (let i = 0; i < H; i++) graph.push(input[i + line].split(" ").map(Number));
    for (let i = 0; i < H; i++) {
        for (let j = 0; j < W; j++) {
            if(graph[i][j] === 1) {
                dfs(graph, i, j);
                cnt++;
            }
        }
    }

    answer += cnt + "\n";
    line += H;
}

console.log(answer);