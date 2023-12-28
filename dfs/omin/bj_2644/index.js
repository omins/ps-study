const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [N, st, _, ...relations] = fs
  .readFileSync(filepath)
  .toString()
  .trim()
  .split('\n');

const [start, target] = st.split(' ').map(el => Number(el) - 1);
const visited = Array.from({ length: Number(N) }).fill(false);
const adj = {};
let answer = -1;

for (let i = 0; i < Number(N); i++) {
  adj[i] = {};
  adj[i]['p'] = [];
  adj[i]['c'] = [];
}

relations.forEach(relation => {
  const [parent, child] = relation.split(' ').map(el => Number(el) - 1);
  adj[parent]['c'].push(child);
  adj[child]['p'].push(parent);
});

visited[start] = true;
dfs(start, 0);
console.log(answer);

function dfs(cur, step) {
  if (cur === target) {
    answer = step;
    return;
  }

  const parent = adj[cur]['p'];
  const child = adj[cur]['c'];

  if (parent.length && !visited[parent[0]]) {
    visited[parent[0]] = true;
    dfs(parent[0], step + 1);
  }

  child.forEach(c => {
    if (!visited[c]) {
      visited[c] = true;
      dfs(c, step + 1);
    }
  });
}
