## 1525번 문제

[문제 링크](https://www.acmicpc.net/problem/1525)

### 풀이 코드

```js
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
```

### 생각한 것

1. 3\*3 공간에 한 개의 빈 공간이 주어지고, 가장 짧은 단계 안에 퍼즐을 맞추는 문제.

2. 처음에 배열을 한 줄로 만들어서 순회하는 것도 고려했지만, 2차원 배열과 로직에서 큰 차이가 없고, 트리에서 최대 9 depth까지만 탐색하면 해결할 수 있다고 생각해서 2차원 배열로 문제를 풀었다.
   - 첫 시도 오답. 퍼즐에서 가능한 모든 배치를 해야 하는데, 단순히 9지점을 모두 방문하면 순회를 멈추었다.
3. 이때 정답 코드를 일부 참고해서 아이디어를 얻었다. 가능한 배치를 모두 보고, 배치는 문자열로 표현하기.

   - queue 시간 초과. `Array.prototype.shift()`는 최악의 경우 $O(N)$

4. 연결 리스트로 큐를 직접 구현해서 삽입 삭제 연산의 시간 복잡도를 $O(1)$ 로 줄인다.
   - 메모리 초과.
5. 문자열에서 문자 두 개를 swap할 때 배열을 사용했다 -> 매 swap마다 배열이 사용되어 문자열만 사용할 때보다 많은 메모리를 사용했다.

   ```js
   // 메모리 초과
   function swap(board, current, move) {
     const arr = board.split('');
     const temp = arr[current];
     arr[current] = arr[move];
     arr[move] = temp;

     return arr.join('');
   }
   ```

6. 문자열을 substring으로 잘라서 swap했다.

   ```js
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
   ```

### 시간 복잡도

$O(N!)$

### 사용한 자료구조 / 알고리즘

연결 리스트, 큐 / BFS

### 코멘트

- 공간 복잡도와 시간 복잡도를 동시에 고려해야 했다.

### 난이도 / 걸린 시간

- 골드2 / 4시간
