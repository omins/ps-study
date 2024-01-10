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
  const [front, back] = relation.split(' ').map(num => Number(num) - 1);
  const frontArr = adj.get(front);
  const backArr = adj.get(back);

  frontArr.push(back);
  backArr.push(front);
});

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.length = 0;
  }

  enqueue(data) {
    const node = new Node(data);

    if (this.length === 0) {
      this.front = node;
    } else {
      this.rear.next = node;
    }

    this.rear = node;
    this.length++;
  }

  dequeue() {
    if (this.length < 1) return undefined;

    const data = this.front.data;
    this.front = this.front.next;
    this.length--;

    return data;
  }

  hasItem() {
    return this.length > 0;
  }
}

function getMalformedCount(start, adj, visited) {
  let count = 0;

  const queue = new Queue();
  queue.enqueue(start);
  visited[start] = true;

  while (queue.hasItem()) {
    const current = queue.dequeue();
    const adjList = adj.get(current);

    adjList.forEach(node => {
      if (!visited[node]) {
        queue.enqueue(node);
        visited[node] = true;
        count++;
      }
    });
  }

  return count;
}

console.log(getMalformedCount(0, adj, visited));
