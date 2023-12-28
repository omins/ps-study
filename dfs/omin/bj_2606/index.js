const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [V, _, ...rest] = fs.readFileSync(filepath).toString().trim().split('\n');

const adj = {};
const visited = Array(Number(V)).fill(false);

for (let i = 0; i < V; i++) {
  adj[i] = [];
}

rest.forEach(el => {
  const [left, right] = el.split(' ').map(Number);
  adj[left - 1].push(right - 1);
  adj[right - 1].push(left - 1);
});

let answer = 0;

visited[0] = true;
dfs(0);

console.log(answer);

function dfs(start) {
  adj[start].forEach(v => {
    if (!visited[v]) {
      answer += 1;
      visited[v] = true;
      dfs(v);
    }
  });
}
