class Queue {
  constructor() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }

  size() {
    if (this.items[this.tail] === undefined) {
      return 0;
    } else {
      return this.tail - this.head + 1;
    }
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
}

const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const N = Number(input.shift());
const graph = [];
const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];
const aptCnt = [];

for (let i = 0; i < N; i++) {
  graph.push(input[i].split("").map(Number));
}

function bfs(x, y) {
  const queue = new Queue();
  queue.enque([x, y]);
  graph[x][y] = 0;
  let curCnt = 1;

  while (queue.size()) {
    const [x, y] = queue.deque();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < N && nx >= 0 && ny < N && ny >= 0) {
        if (graph[nx][ny] === 1) {
          queue.enque([nx, ny]);
          graph[nx][ny] = 0;
          curCnt += 1;
        }
      }
    }
  }

  aptCnt.push(curCnt);
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (graph[i][j] === 1) {
      bfs(i, j);
    }
  }
}

aptCnt.sort((a, b) => a - b);

console.log(aptCnt.length);
for (let x of aptCnt) {
  console.log(x);
}
