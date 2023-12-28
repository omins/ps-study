const dfs = (x, y) => {
    cnt++;
    visited[x][y] = true;

    for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (nx >= 0 && nx < h && ny >= 0 && ny < w && !graph[nx][ny] && !visited[nx][ny]) dfs(nx, ny);
    }
};

const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const [h, w, k] = input[0].split(" ").map(Number);
const graph = Array.from(Array(h), () => Array(w).fill(0));
const visited = Array.from(Array(h), () => Array(w).fill(false));
const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

for (let i = 1; i <= k; i++) {
    // 사각형의 꼭지점 좌표 (왼쪽아래, 오른쪽 위)
    const [y1, x1, y2, x2] = input[i].split(" ").map(Number);
    // 사각형의 꼭지점 안쪽에 해당하는 구역을 처리
    for (let x = h - x2; x < h - x1; x++) {
        for (let y = y1; y < y2; y++) {
            // 해당하는 구역은 1로 변환.
            graph[x][y] = 1;
        }
    }
}

let cnt = 0;

const result = [];

for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
        cnt = 0; // 구역별로 카운트 초기화.
        if (!graph[i][j] && !visited[i][j]) {
            dfs(i, j);
            result.push(cnt);
        }
    }
}

console.log(result.length);
console.log(result.sort((a, b) => a - b).join(" "));