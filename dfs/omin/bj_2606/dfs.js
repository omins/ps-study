const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [N, _, ...relations] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const adj = new Map();
const visited = Array(Number(N)).fill(false);

for (let i = 0; i < Number(N); i++) {
  adj.set(i, []);
}

relations.forEach(relation => {
  const [front, back] = relation.split(' ').map(el => Number(el) - 1);

  const frontArr = adj.get(front);
  const backArr = adj.get(back);

  frontArr.push(back);
  backArr.push(front);
});

console.log(getMalformedCount(0, adj, visited));

function getMalformedCount(start, adj, visited) {
  let count = 0;
  visited[start] = true;

  const adjList = adj.get(start);

  adjList.forEach(node => {
    if (!visited[node]) {
      count += getMalformedCount(node, adj, visited);
      count++;
    }
  });

  return count;
}
