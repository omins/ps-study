# 문제풀이

[문제링크](https://www.acmicpc.net/problem/11724)

문제 난이도 : 실버 2  
소요시간 : 30분

## 문제 요구 사항

정점의 개수 N과 간선의 개수 M이 주어지고 M개의 간선의 정보가 주어질 때 연결 요소의 개수를 구하라

```
input 예시

N, M
6 5
간선 정보
1 2
2 5
5 1
3 4
4 6
```

## 문제 접근 방법

출발 노드에서 시작해 연결되어 있는 노드를 하나씩 방문하다가 더 이상 방문할 곳이 없다면 하나의 연결 요소가 끝난 것이므로 cnt를 하나 더해준다.

### 문제 해결 로직

#### 전체 로직

- 간선의 정보를 기록한 이차원 배열을 만든다.
- 방문처리 배열을 만든다.
- 연결 요소의 개수를 기록할 cnt를 만든다.
- 반복문을 이용해 방문처리 배열을 하나씩 확인하며 방문하지 않은 정점을 이용해 bfs 함수를 호출한다.
- bfs 함수의 처리가 끝나면 즉 출발 노드와 연결되어 있는 모든 노드를 확인했다면 cnt를 더해준다.

```js
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
```

#### bfs 로직

- 현재 노드를 큐에 담아주고 방문처리 한다.
- 큐에 원소가 있는 동안 아래 로직을 반복한다.
  - 큐에 들어있는 노드 중에서 제일 앞에 있는 노드를 꺼낸다.
  - 꺼낸 노드가 이동 가능한 노드들을 확인하면서 아직 방문하지 않았다면 방문처리를 하고 큐에 담아준다.
- 더 이상 방문 가능한 노드가 없다면 함수를 종료한다.

```js
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
```
