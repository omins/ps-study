# 문제풀이

### 문제 난이도 : 실버 2

### 소요시간 : 40분

## 문제 설명

사람들은 1, 2, 3, …, n (1 ≤ n ≤ 100)의 연속된 번호로 각각 표시된다. 입력 파일의 첫째 줄에는 전체 사람의 수 n이 주어지고, 둘째 줄에는 촌수를 계산해야 하는 서로 다른 두 사람의 번호가 주어진다. 그리고 셋째 줄에는 부모 자식들 간의 관계의 개수 m이 주어진다. 넷째 줄부터는 부모 자식간의 관계를 나타내는 두 번호 x,y가 각 줄에 나온다. 이때 앞에 나오는 번호 x는 뒤에 나오는 정수 y의 부모 번호를 나타낸다.

각 사람의 부모는 최대 한 명만 주어진다.

## 문제 접근

촌수를 계산해야 하는 두 사람을 start, end로 구분하여 start에서 end까지 몇번의 이동을 했는지 계산한다. 이동을 기록하는 수단으로는 visited 배열을 이용해서 방문처리와 동시에 이동을 기록한다.

### 전체 로직

- 전체 사람들의 관계를 기록한 그래프를 만든다.
- visited 배열을 만들어서 모든 원소를 0으로 초기화 한다.
- visited 배열은 단순 방문처리 이외에 start에서 각 인덱스 까지 몇번의 이동을 했는지 기록한다.
- bfs 함수를 실행한다.
- cnt 변수에 visited[end]가 0보다 크다면, 즉 관계가 이어지는 사이라면 촌수를 할당하고 관계가 없는 사이라면 -1을 할당한다.
- cnt 를 출력한다.

```js
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const numberOfPeople = Number(input.shift());
const [start, end] = input.shift().split(" ").map(Number);
const path = Number(input.shift());
const graph = [];
const visited = new Array(numberOfPeople + 1).fill(0);

for (let i = 0; i <= numberOfPeople; i++) {
  graph.push([]);
}

for (let i = 0; i < path; i++) {
  const [x, y] = input[i].split(" ").map(Number);

  graph[x].push(y);
  graph[y].push(x);
}

bfs(start);
const cnt = visited[end] > 0 ? visited[end] : -1;

console.log(cnt);
```

### bfs 로직

- 큐에 출발 노드를 담아준다.
- 큐에 크기가 0보다 크다면 아래 로직을 반복한다.
  1. 큐의 제일 앞에 있는 원소를 꺼내 cur 변수에 할당한다.
  2. graph[cur]에 있는 원소들을 확인하여 아직 방문하지 않았다면 큐에 담아주고 방문처리와 이동 횟수를 기록한다.
  3. 만약 x가 end와 같다면 반복문을 종료한다.

```js
function bfs(node) {
  const que = new Queue();
  que.enque(node);

  while (que.size()) {
    const cur = que.deque();

    for (let x of graph[cur]) {
      if (!visited[x]) {
        visited[x] += visited[cur] + 1;
        que.enque(x);
      }
      if (x === end) {
        break;
      }
    }
  }
}
```
