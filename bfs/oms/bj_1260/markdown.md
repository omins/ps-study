# 문제풀이

[문제링크](https://www.acmicpc.net/problem/1260)

문제 난이도 : 실버 2

소요시간 : 1시간 30분

## 문제 설명

정점의 개수, 간선의 개수, 출발 정점 이 주어진다. 출발지점에서 탐색을 시작할 때 방문하게 되는 정점을 순서대로 나열한다.  
dfs, bfs 의 탐색 결과를 차례로 출력하라.

## 문제 접근

### dfs

- 출발 지점은 방문처리 하고 정답 배열에 담아준다.
- 현재 정점과 연결되어 있는 정점들을 하나씩 확인하며 방문여부를 확인한다.
- 방문하지 않은 정점이라면 방문하고 정답 배열에 담아준다.
- 모든 탐색이 종료되면 정답 배열을 `join(" ")`을 사용하여 출력한다.

```js
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
```

### bfs

- 출발 지점을 큐에 담아준다.
- 큐에 원소가 존재하는 동안 아래 과정을 반복한다.
- 큐의 제일 앞에 있는 원소를 꺼내어 방문처리 한다.
- 큐에서 꺼낸 원소를 정답 배열에 담아준다.
- 현재 정점과 연결되어 있는 원소들을 하나씩 확인하며 방문하지 않은 원소들을 큐에 담아준다.
- 모든 탐색이 종료되면 정답 배열을 `join(" ")`을 사용하여 출력한다.

```js
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
```

### 전체 로직

- 정점의 개수, 간선의 개수, 출발 정점을 분리한다.
- 간선의 정보를 담을 그래프를 생성한다.
- 방문처리를 담당할 배열을 생성한다.
- 그래프에 간선의 정보를 담아주고 각 정점의 간선 정보를 오름차순으로 정렬한다.
- dfs, bfs의 정답 정보를 담아줄 배열을 각각 생성한다.
- dfs를 실행한다.
- 방문처리 배열 초기화 한다.
- bfs를 실행한다.

```js
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
```
