## 문제풀이
[문제링크](https://www.acmicpc.net/problem/2606)

문제 난이도: 실버 3

소요시간: 30분

### 문제설명
컴퓨터의 개수와 연결되어 있는 쌍의 개수 그리고 쌍의 수만큼 연결되어 있는 경로가 주어진다. 

이때 1번 컴퓨터와 연결되어 있는 컴퓨터의 개수를 출력하면 된다.

### 문제접근
* 그래프 배열을 만든다.
>1. index로 접근을 편하게 하기 위해서 컴퓨터의 수 + 1 만큼 배열을 만든다.
>2. 컴퓨터의 연결경로를 보면서 각 컴퓨터 번호에 연결되어 있는 컴퓨터의 번호를 저장한다.
* 한번 방문한 노드는 다시 방문하지 않기 위해서 방문처리 배열을 만든다.
* 그래프의 1번 노드부터 방문하여 탐색을 시작한다.
>1. 현재 방문한 노드를 방문처리.
>2. 카운트 +.
>3. 현재 방문한 노드와 연결되어 있는 노드들을 하나씩 확인하며 1~2번을 반복한다.
* 최종으로 카운트를 출력한다. 이때 1번을 제외한 나머지 개수를 출력하기 때문에 -1 을 진행하고 출력한다.


### 문제코드
```js
function dfs(cur) {
    visited[cur] = true;
    cnt++;
    const path = connections[cur];
    for (let i = 0; i < path.length; i++) {
        if (visited[path[i]]) continue;
        dfs(path[i]);
    }
}

const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");
const N = Number(input[0]);
const pairs = Number(input[1]);
const connections = [];
for (let i = 0; i < N + 1; i++) connections.push([]);
for (let i = 2; i <= pairs + 1; i++) {
    const [a, b] = input[i].split(" ").map(Number);
    connections[a].push(b);
    connections[b].push(a);
}
const visited = new Array(N + 1).fill(false);
let cnt = 0;

dfs(1);
console.log(cnt - 1);
```