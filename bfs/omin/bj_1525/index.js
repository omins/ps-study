const fs = require('fs');

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.rear = null;
    this.length = 0;
  }

  enqueue(data) {
    const node = new Node(data);

    if (this.length === 0) {
      this.head = node;
      this.rear = node;
    } else {
      this.rear.next = node;
      this.rear = node;
    }

    this.length++;
  }

  dequeue() {
    if (this.length === 0) return undefined;

    const data = this.head.data;
    this.head = this.head.next;
    this.length--;

    return data;
  }

  hasItem() {
    return this.length > 0;
  }
}

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';

const board = fs
  .readFileSync(filePath)
  .toString()
  .replace(/[\s\n]/g, '');

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];
const N = 3;
const M = 3;

const target = '123456780';

const step = getMinStepToAnswer(board, target);
console.log(step);

function getMinStepToAnswer(board, answer) {
  const visited = new Map();
  const queue = new Queue();

  visited.set(board, 0);
  queue.enqueue(board);

  while (queue.hasItem()) {
    const currentBoard = queue.dequeue();
    const step = visited.get(currentBoard);

    if (currentBoard === answer) return step;

    const idx = currentBoard.indexOf('0');
    const curX = Math.floor(idx / N);
    const curY = idx % M;

    for (let i = 0; i < 4; i++) {
      const nx = curX + dx[i];
      const ny = curY + dy[i];

      if (!isGoodToGo(nx, ny)) continue;
      const newIdx = nx * N + ny;
      const front = Math.min(idx, newIdx);
      const back = Math.max(idx, newIdx);
      const newBoard = swap(currentBoard, front, back);

      if (visited.get(newBoard)) continue;

      visited.set(newBoard, step + 1);
      queue.enqueue(newBoard);
    }
  }

  return -1;
}

function isGoodToGo(x, y) {
  return x >= 0 && x < 3 && y >= 0 && y < 3;
}

function swap(inputString, front, back) {
  const charAtFront = inputString[front];
  const charAtBack = inputString[back];

  const swappedString =
    inputString.substring(0, front) +
    charAtBack +
    inputString.substring(front + 1, back) +
    charAtFront +
    inputString.substring(back + 1);

  return swappedString;
}
