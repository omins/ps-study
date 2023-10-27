# 📝 문제풀이

문제 난이도 : 실버 3

소요시간 : 30분

## 🛠️ 문제접근

기존에 해당 문제를 dfs로 풀었던 적이 있다.

하지만 해당 문제는 bfs로도 해결이 가능한 문제이기에 이번에는 bfs로 문제를 해결해 보았다.

### bfs란?

dfs가 가장 멀리 있는 노드를 우선으로 탐색한다면 bfs는 시작 노드의 가장 가까운 노드부터 탐색을 진행한다.
이 과정에서 선입선출 방식인 큐 자료구조를 사용하게 된다.

### 문제 요구사항

컴퓨터의 개수와 연결되어 있는 간선의 수가 주어진다. 1번 컴퓨터가 바이러스에 감염되면 연결되어 있는 모든 컴퓨터가 바이러스에 감염된다. 이때 바이러스에 감염되는 컴퓨터의 개수는 몇개인가?

해당 문제는 연결요소를 찾는 문제로 해석할 수 있다. 즉 1번 컴퓨터와 연결되어 있는 컴퓨터의 개수를 출력하는 문제.

### 어떤 과정으로 해결했나?

- 현재 출발 노드를 큐에 담아주고 방문처리 한다.
- `while (que.size())`로 큐 안에 원소가 존재한다면 계속해서 진행한다.
- 큐의 가장 앞에 있는 원소를 꺼내어 접근 가능한 노드가 있는지 확인한다.
- 접근 가능한 노드가 있다면 해당 노드를 큐에 담아주고 방문처리 한다.
- cnt += 1 을 진행한다.
- 접근 가능한(연결되어 있는) 모든 노드를 방문했다면 bfs를 종료한다.
- cnt를 출력한다.

### 문제코드

```js
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
```

#### bfs 코드

```js
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
```
