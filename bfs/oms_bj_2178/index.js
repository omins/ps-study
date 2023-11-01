function bfs(x, y) {
  const que = [];

  que.push([x, y, 1]);

  while (que.length) {
    const [x, y, cnt] = que.shift();

    if (x === n - 1 && y === m - 1) {
      return cnt;
    }

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && nx < n && ny >= 0 && ny < m && maze[nx][ny] === 1) {
        maze[nx][ny] = 0;
        que.push([nx, ny, cnt + 1]);
      }
    }
  }
}

const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const [n, m] = input.shift().split(" ").map(Number);
const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];
const maze = input.map((row) => row.split("").map(Number));

console.log(bfs(0, 0));
