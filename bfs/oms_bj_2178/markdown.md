# 문제풀이

[문제링크](https://www.acmicpc.net/problem/2178)

문제 난이도 : 실버 1

소요 시간 : 1시간 20분

## 문제 설명

N \* M 크기의 미로가 주어질 때 출발지점에서 최종 지점까지 도달하는 최단 경로를 구하고 최단 경로로 이동했을 때 몇개의 노드를 거치는지 출력해라.

## 문제 접근

### 고려한 점

- 방문처리를 어떻게 진행할 지
- 거쳐간 노드의 수를 어떻게 셀지

### 기본 코드

```js
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const [n, m] = input.shift().split(" ").map(Number);
const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];
const maze = input.map((row) => row.split("").map(Number));

console.log(bfs(0, 0));
```

### bfs

- 큐에 현재 좌표, 거쳐간 노드의 수(`[x, y, 1]`)를 담아준다.
- 큐에서 원소를 꺼내어 이동 가능한 노드가 있는지 확인한다.
- 이동 가능한 노드가 있다면 큐에 (`[nx, ny, cnt + 1]`) 담아주고 방문처리한다.
- 큐에서 꺼낸 원소가 목적지와 같아질 때 까지 반복한다.
- 목적지에 도달했다면 `return cnt` 를 해준다.

```js
function bfs(x, y) {
  const que = [];

  que.push([x, y, 1]);

  while (que.length) {
    const [x, y, cnt] = que.shift();

    if (x === n - 1 && y === m - 1) {
      return cnt;
    }

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && nx < n && ny >= 0 && ny < m && maze[nx][ny] === 1) {
        maze[nx][ny] = 0;
        que.push([nx, ny, cnt + 1]);
      }
    }
  }
}
```

## 어려웠던 점

제대로 구현을 했다고 생각해서 제출을 했는데 계속 시간초과에 걸려서 통과하지 못했다.  
원인이 무엇인지 분석해보니 방문처리 시점의 문제였다.  
처음에는 방문처리 시점을 노드를 큐에서 꺼냈을 때 진행했는데 그렇게 했을 때의 문제는 내가 아지 해당 노드를 꺼내지 않았는데 다른 노드에서 해당 노드에 접근이 가능하다면 또 큐에 담기게 된다. 불필요한 탐색을 하게 되는 것이다.  
해당 문제를 파악하고 방문처리 시점을 노드를 꺼내는 시점이 아닌 큐에 담는 시점에 방문처리를 했더니 바로 통과할 수 있었다.
