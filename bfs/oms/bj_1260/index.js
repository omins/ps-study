class Que {
  constructor() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }

  enque(item) {
    if (this.size() === 0) {
      this.items["0"] = item;
    } else {
      this.tail++;
      this.items[this.tail] = item;
    }
  }

  deque() {
    let item;

    if (this.head === this.tail) {
      item = this.items[this.head];
      delete this.items[this.head];
      this.head = 0;
      this.tail = 0;
    } else {
      item = this.items[this.head];
      delete this.items[this.head];
      this.head++;
    }

    return item;
  }

  size() {
    if (this.items[this.tail] === undefined) {
      return 0;
    } else {
      return this.tail - this.head + 1;
    }
  }
}

function dfs(start) {
  if (visited[start]) return;
  visited[start] = true;
  dfsAnswer.push(start);

  for (let i = 0; i < graph[start].length; i++) {
    const next = graph[start][i];

    if (!visited[next]) {
      dfs(next);
    }
  }
}

function bfs(start) {
  const queue = new Que();

  queue.enque(start);

  while (queue.size()) {
    const cur = queue.deque();

    if (visited[cur]) {
      continue;
    }

    visited[cur] = true;
    bfsAnswer.push(cur);

    for (let i = 0; i < graph[cur].length; i++) {
      const next = graph[cur][i];

      if (!visited[next]) {
        queue.enque(next);
      }
    }
  }
}

const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().toString().split("\n");

const [nodes, path, start] = input[0].split(" ").map(Number);

const graph = [];
const visited = new Array(nodes + 1).fill(false);

for (let i = 1; i <= nodes; i++) {
  graph[i] = [];
}

for (let i = 1; i <= path; i++) {
  const [a, b] = input[i].split(" ").map(Number);

  graph[a].push(b);
  graph[b].push(a);
}

graph.map((e) => {
  e.sort((a, b) => a - b);
});

let dfsAnswer = [];
let bfsAnswer = [];

dfs(start);

visited.fill(false);

bfs(start);

console.log(dfsAnswer.join(" "));
console.log(bfsAnswer.join(" "));
