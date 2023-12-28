## 문제풀이
[문제링크](https://www.acmicpc.net/problem/4963)

문제 난이도: 실버 2

소요시간: 2시간

### 문제 설명
지도 넓이와 높이가 주어지고 해당지도는 섬이 1로 표시되어 있다. 이때 가로세로 대각선으로 이어지는 섬은 하나로 가정할 때
지도에 있는 섬의 개수를 출력하라. 

* 입력은 여러개의 테스트케이스로 주어진다.
* 높이와 넓이의 최대수는 50이하이다.

### 문제접근
#### 고려해야 하는 부분?
* 테스트케이스는 어떻게 나눠야 하는가
>* line 이라는 변수를 만들어 현재 테스트케이스에 접근한다.
* 방문처리를 어떻게 진행할지
>* 섬이 있는 위치는 1 섬이 아닌 곳은 0 이므로 방문한 위치를 0 으로 바꾸어 방문처리를 진행한다.
* 현재 위치에서 움직이는 방향을 어떻게 명시할까
>* dx, dy 라는 변수를 만들어서 어떻게 움직일지 방향을 정해 놓는다.
* 카운트는 언제 진행하는가
>* 실행된 함수가 종료되는 시점 즉 현재 방문한 섬에서 연결되는 지점을 모두 방문했을 때.
* 재귀함수의 발동조건은 어떻게 할지
>* 현재의 위치가 지도를 벗어나지 않고 섬의 위치라면 발동.

#### 솔루션 함수
```js
function dfs(graph, x, y) {
    const h = graph.length;
    const w = graph[0].length;
    graph[x][y] = 0; // 방문처리
    for (let i = 0; i < 8; i++) {
        // 인접한 노드로 이동
        const nx = x + dx[i];
        const ny = y + dy[i];
        // 인접한 노드가 그래프의 범위 안에 있고 값이 1 이라면 다음 노드로 이동
        if (nx >= 0 && nx < h && ny >= 0 && ny < w && graph[nx][ny] === 1) dfs(graph, nx, ny);
    }
}
```

#### 문제 코드
```js
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

let line = 0;
const dx = [1, -1, 0, 0, 1, -1, 1, -1];
const dy = [0, 0, 1, -1, 1, 1, -1, -1];

let answer = "";
// line 이 input 의 길이보다 짧은 경우에 반복
while (line < input.length) {
    let cnt = 0;
    const [W, H] = input[line].split(" ").map(Number);
    // 현재 케이스의 그래프 범위를 가져온다.
    if (W === 0 && H === 0) break; // 현재 케이스의 그래프가 없다면 종료.
    line++; // 현재 케이스의 다음 줄부터 있는 그래프를 받아오기 위해 line + 1.
    const graph = [];
    for (let i = 0; i < H; i++) graph.push(input[i + line].split(" ").map(Number));
    // 그래프를 탐색하면서 섬을 발견하면 함수를 실행한다.
    for (let i = 0; i < H; i++) {
        for (let j = 0; j < W; j++) {
            if(graph[i][j] === 1) {
                dfs(graph, i, j);
                // 함수가 종료되면 , 즉 연결된 섬을 모두 방문처리 했다면 카운트
                cnt++;
            }
        }
    }

    answer += cnt + "\n"; // 모든 케이스의 답을 한번에 출력하기 위해 변수에 담아준다
    line += H; // 다음 케이스로 이동
}

console.log(answer);
```