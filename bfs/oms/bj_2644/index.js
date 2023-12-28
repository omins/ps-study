class Queue {
  constructor() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }

  enque(item) {
    if (this.size() === 0) {
      this.items["0"] = item;
    } else {
      this.tail += 1;
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
      this.head += 1;
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

function bfs(node) {
  const que = new Queue();
  que.enque(node);

  while (que.size()) {
    const cur = que.deque();

    for (let x of graph[cur]) {
      if (!visited[x]) {
        visited[x] += visited[cur] + 1;
        que.enque(x);
      }
      if (x === end) {
        break;
      }
    }
  }
}

const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const numberOfPeople = Number(input.shift());
const [start, end] = input.shift().split(" ").map(Number);
const path = Number(input.shift());
const graph = [];
const visited = new Array(numberOfPeople + 1).fill(0);

for (let i = 0; i <= numberOfPeople; i++) {
  graph.push([]);
}

for (let i = 0; i < path; i++) {
  const [x, y] = input[i].split(" ").map(Number);

  graph[x].push(y);
  graph[y].push(x);
}

bfs(start);
const cnt = visited[end] > 0 ? visited[end] : -1;

console.log(cnt);
