# 문제풀이

[문제링크](https://www.acmicpc.net/problem/2667)

문제난이도 : 실버1

소요시간 : 1시간

## 문제설명

<그림 1>과 같이 정사각형 모양의 지도가 있다. 1은 집이 있는 곳을, 0은 집이 없는 곳을 나타낸다. 철수는 이 지도를 가지고 연결된 집의 모임인 단지를 정의하고, 단지에 번호를 붙이려 한다. 여기서 연결되었다는 것은 어떤 집이 좌우, 혹은 아래위로 다른 집이 있는 경우를 말한다. 대각선상에 집이 있는 경우는 연결된 것이 아니다. <그림 2>는 <그림 1>을 단지별로 번호를 붙인 것이다. 지도를 입력하여 단지수를 출력하고, 각 단지에 속하는 집의 수를 오름차순으로 정렬하여 출력하는 프로그램을 작성하시오.

- 연결요소의 수를 구해 출력한다.
- 연결요소의 포함되는 노드의 수를 구해 오름차순으로 출력한다.

## 문제접근

### 세팅

- input에서 N을 가져와 할당한다.
- input에서 그래프의 정보를 이차원 배열로 변경한다.
- 상하좌우 탐색을 위한 이동 방향 배열을 선언한다.
- 각 연결요소의 원소를 기록할 빈 배열을 선언한다. (배열의 길이는 연결요소의 개수가 된다.)

```js
const N = Number(input.shift());
const graph = [];
const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];
const aptCnt = [];

for (let i = 0; i < N; i++) {
  graph.push(input[i].split("").map(Number));
}
```

- 반복문으로 그래프를 탐색하며 아파트 위치를 만나면 bfs를 실행한다.

```js
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (graph[i][j] === 1) {
      bfs(i, j);
    }
  }
}
```

- aptCnt 배열을 오름차순 정렬한다.
- aptCnt 배열의 길이를 출력한다.
- aptCnt 배열의 원소를 하나씩 출력한다.

### bfs

- 큐를 생성한다.
- 큐에 현재 좌표를 담아준다.
- 현재 위치를 방문 처리한다.
- 몇개의 노드가 연결되어 있는지 기록할 cnt 변수를 선언하고 1로 초기화한다.
- 큐에 원소가 있는 동안 아래 로직을 반복한다.
  1. 현재 좌표를 x, y에 할당한다.
  2. 현재 위치의 상하좌우를 탐색한다.
  3. 이동 가능한 위치가 있다면 해당 좌표를 큐에 담아준다.
  4. 이동 가능한 위치의 좌표를 큐에 담아준다.
  5. 이동 가능한 위치를 방문 처리한다.
  6. cnt를 += 1 한다.
- cnt를 aptCnt 배열에 담아준다.

```js
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
```
