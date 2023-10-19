## 문제풀이
[문제링크](https://www.acmicpc.net/problem/2468)

문제 난이도: 실버 1

소요시간: 30분

### 문제설명
N * N 사이즈로 지도가 주어진다. 각 노드에는 지형의 높이가 있고 현재 강수량 이하의 지역은 물에 잠기게 된다.

이때 비에 잠기지 않는 지역을 안전구역이라고 하고 만약 안전구역이 상하좌우 붙어있다면 1개의 구역으로 간주한다.

안전구역의 수가 최대인 경우의 수를 구하라.

*모든 구역이 비에 잠기지 않는 경우도 있다.*

### 문제접근
그래프 내의 연결요소의 개수를 찾는 문제(안전구역).

#### 기본로직
* 최대 안전구역의 수를 1로 선언한다. (모든 구역이 비에 잠기지 않을 경우 지도의 안전구역은 1이된다.)
* 비의 높이별로 안전구역의 수를 개산한다. *(while문 으로 반복 비의 높이가 0보다 높을 때)*
>* 방문처리 배열을 만든다. 연결여부를 확인할 때 방문한 노드를 다시 방문하지 않기 위해.
>* 안전구역의 수를 기록할 cnt 를 만든다.
>* 지도의 노드를 하나씩 확인하며 만약 방문하지 않았고 비의 높이보다 높은 지형이라면 dfs함수를 실행한다.
>* 현재 실행한 함수가 종료되면 cnt + 1 을 해준다. *(함수가 종료되었다면 모든 연결요소를 확인한 것.)*
>* 최대 안전구역의 수와 cnt 를 비교하여 큰값으로 대체한다.
* 최대 안전구역의 수를 출력한다.

#### dfs
1. 현재 방문한 노드를 방문처리한다.
2. 현재 노드이 상하좌우를 확인하며 방문가능한 노드가 있는지 확인한다.
3. 방문가능한 노드가 있다면 1 ~ 2 를 반복한다.

### 문제코드

#### 기본코드
```js
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const N = Number(input[0]);
const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];
const graph = [];
let rainHeight = 0;
let maxSafeZone = 1;

for (let i = 1; i <= N; i++) {
    rainHeight = Math.max(rainHeight, ...input[i].split(" ").map(Number));
    graph.push(input[i].split(" ").map(Number));  
} 

while (rainHeight > 0) {
    let cnt = 0;
    const visited = Array.from(Array(N), () => Array(N).fill(false));


    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (graph[i][j] > rainHeight && !visited[i][j]) {
                dfs(i, j, visited);
                cnt++;
            }
        }
    }

    maxSafeZone = Math.max(maxSafeZone, cnt);
    rainHeight--;
}

console.log(maxSafeZone);
```

#### dfs코드
```js
function dfs(x, y, visited) {
    visited[x][y] = true;

    for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (nx >= 0 && nx < N && ny >= 0 && ny < N && !visited[nx][ny] && graph[nx][ny] > rainHeight) dfs(nx, ny, visited);
    }
}
```