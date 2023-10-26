/**
 * DFS와 DP를 이용한 코드
 */
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [NM, ...rest] = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = NM.split(' ').map(Number);
const dp = Array.from({ length: N }, () => Array.from({ length: M }).fill(-1));
const board = rest.map(line => line.split(' ').map(Number));
const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

const lastIndicies = { x: N - 1, y: M - 1 };

dfs(0, 0);
console.log(dp[0][0]);

function dfs(x, y) {
  if (x === lastIndicies.x && y === lastIndicies.y) {
    return 1;
  }

  if (isCounted(x, y)) {
    return dp[x][y];
  }

  let cnt = 0;

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (isGoodToGo(x, y, nx, ny)) {
      cnt += dfs(nx, ny);
    }
  }

  dp[x][y] = cnt;
  return cnt;
}

function isCounted(x, y) {
  return dp[x][y] !== -1;
}

function isGoodToGo(x, y, nx, ny) {
  return nx >= 0 && nx < N && ny >= 0 && ny < M && board[nx][ny] < board[x][y];
}

/**
 * DFS와 백트래킹을 이용한 코드.
 * 시간초과.
 */
// const fs = require('fs');
// const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
// const [NM, ...rest] = fs.readFileSync(filePath).toString().trim().split('\n');

// const [N, M] = NM.split(' ').map(Number);
// const visited = Array.from({ length: N }, () =>
//   Array.from({ length: M }).fill(false)
// );
// const board = rest.map(line => line.split(' ').map(Number));
// const dx = [1, -1, 0, 0];
// const dy = [0, 0, 1, -1];

// const lastIndicies = { x: N - 1, y: M - 1 };
// let cnt = 0;

// dfs(0, 0);
// console.log(cnt);

// function dfs(x, y) {
//   if (x === lastIndicies.x && y === lastIndicies.y) {
//     cnt++;
//     return;
//   }

//   visited[x][y] = true;

//   for (let i = 0; i < 4; i++) {
//     const nx = x + dx[i];
//     const ny = y + dy[i];

//     if (isGoodToGo(x, y, nx, ny)) {
//       dfs(nx, ny);
//     }
//   }

//   visited[x][y] = false;
// }

// function isGoodToGo(x, y, nx, ny) {
//   return nx >= 0 && nx < N && ny >= 0 && ny < M && board[nx][ny] < board[x][y];
// }
