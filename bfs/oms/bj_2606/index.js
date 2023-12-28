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

function bfs(start) {
  const que = new Que();

  que.enque(start);
  visited[start] = true;

  while (que.size()) {
    const cur = que.deque();

    for (let x of graph[cur]) {
      if (!visited[x]) {
        que.enque(x);
        visited[x] = true;
        cnt++;
      }
    }
  }
}

const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const computers = Number(input[0]);
const connectionCount = Number(input[1]);
const graph = [];
const visited = new Array(computers + 1).fill(false);

for (let i = 0; i <= computers; i++) {
  graph[i] = [];
}

for (let i = 2; i <= connectionCount + 1; i++) {
  const [a, b] = input[i].split(" ").map(Number);

  graph[a].push(b);
  graph[b].push(a);
}

let cnt = 0;

bfs(1);
console.log(cnt);
