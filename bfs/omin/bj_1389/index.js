const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const [NM, ...relations] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');
const [N, _] = NM.split(' ').map(Number);

const adj = Array.from({ length: N }, () => []);

let min = Infinity;
let minPersons = [];

relations.forEach(relation => {
  // base one to base zero
  const [left, right] = relation.split(' ').map(el => Number(el) - 1);
  adj[left].push(right);
  adj[right].push(left);
});

adj.forEach((_, person, origin) => {
  const visited = Array.from({ length: N }).fill(false);
  const curMin = bfs(person, visited, origin);

  if (curMin < min) {
    min = curMin;
    minPersons = [person];
  } else if (curMin === min) {
    minPersons.push(person);
  }
});

const answer = Math.min(...minPersons);
console.log(answer + 1);

function bfs(start, visited, adj) {
  const queue = [];
  let sum = 0;
  visited[start] = true;

  queue.push([start, 0]);

  while (queue.length) {
    const [cur, step] = queue.shift();
    sum += step;

    adj[cur].forEach(friend => {
      if (!visited[friend]) {
        visited[friend] = true;
        queue.push([friend, step + 1]);
      }
    });
  }

  return sum;
}
