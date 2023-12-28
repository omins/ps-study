/* 아래 주석처리한 코드는 오답 코드입니다. 방문처리를 해제하지 않습니다. */
// const fs = require('fs');
// const filepath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
// const [NM, ...rest] = fs.readFileSync(filepath).toString().trim().split('\n');
// const [N, _] = NM.trim().split(' ').map(Number);
// const nodeCnt = Number(N);
// const links = rest.map(line => line.trim().split(' ').map(Number));

// const adj = {};
// let answer = 0;

// for (let i = 0; i < nodeCnt; i++) {
//   adj[i] = [];
// }

// links.forEach(link => {
//   const [left, right] = link;
//   adj[left].push(right);
//   adj[right].push(left);
// });

// for (let i = 0; i < nodeCnt; i++) {
//   const visited = Array.from({ length: nodeCnt }).fill(false);
//   visited[i] = true;

//   dfs(i, 1, visited);
// }

// console.log(answer);
// console.log(adj);

// function dfs(start, step, visited) {
//   console.log('finding', start, visited, 'step', step);
//   if (step === 5) {
//     answer = 1;
//     console.log(visited);
//     return;
//   }

//   adj[start].forEach(node => {
//     if (!visited[node]) {
//       visited[node] = true;
//       dfs(node, step + 1, visited);
//     }
//   });
// }

/* 아래 코드는 정답 코드입니다. 방문처리를 해제합니다. */
const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [NM, ...rest] = fs.readFileSync(filepath).toString().trim().split('\n');
const [N, M] = NM.trim().split(' ').map(Number);
const nodeCnt = N;
const links = rest.map(line => line.trim().split(' ').map(Number));

const adj = {};

for (let i = 0; i < nodeCnt; i++) {
  adj[i] = [];
}

links.forEach(link => {
  const [left, right] = link;
  adj[left].push(right);
  adj[right].push(left);
});

let answer = 0;

for (let i = 0; i < nodeCnt; i++) {
  const visited = Array.from({ length: nodeCnt }).fill(false);
  visited[i] = true;

  if (dfs(i, 1, visited)) {
    answer = 1;
    break;
  }
}

console.log(answer);

function dfs(start, step, visited) {
  if (step === 5) {
    return true;
  }

  for (const node of adj[start]) {
    if (!visited[node]) {
      visited[node] = true;
      if (dfs(node, step + 1, visited)) {
        return true;
      }

      visited[node] = false;
    }
  }

  return false;
}
