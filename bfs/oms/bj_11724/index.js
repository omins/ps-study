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

function bfs(start) {
  que.enque(start);
  visited[start] = true;

  while (que.size()) {
    const cur = que.deque();

    for (let x of nodePath[cur]) {
      if (!visited[x]) {
        que.enque(x);
        visited[x] = true;
      }
    }
  }
}

const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);

const nodePath = [];

for (let i = 0; i <= N; i++) {
  nodePath.push([]);
}

for (let i = 1; i <= M; i++) {
  const [a, b] = input[i].split(" ").map(Number);

  nodePath[a].push(b);
  nodePath[b].push(a);
}

const que = new Queue();
const visited = new Array(N + 1).fill(false);
let cnt = 0;

for (let i = 1; i <= N; i++) {
  if (!visited[i]) {
    bfs(i);
    cnt += 1;
  }
}

console.log(cnt);
