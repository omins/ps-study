## 문제풀이
[문제링크](https://www.acmicpc.net/problem/2583)

문제 난이도: 실버 1

소요시간: 2시간

### 문제접근
1. m , n 사이즈에 맞는 그래프를 만든다.
2. 해당 그래프에 직사각형 구역을 처리한다.
3. 나머지 구역의 방문여부를 체크할 방문처리 배열을 생성한다.
3. 그래프를 확인하며 나머지 구역을 확인하고 연결된 나머지 구역의 수를 카운트.
>* 방문처리
>* 카운트 진행
>* 인접한 노드중에 방문하지 않은 노드가 있는지 확인.
>* 방문하지 않은 노드가 있으면 방문하여 반복.
4. 나머지 구역의 수를 세기 위해서 카운트를 result 라는 배열에 담아준다.
5. 나머지 구역의 수는 result 배열의 길이로 출력.
6. 나머지 구역별 크기는 result 배열의 원소를 공백으로 나누어 출력.

### 문제코드

#### 풀이코드
```js
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const [h, w, k] = input[0].split(" ").map(Number);
const graph = Array.from(Array(h), () => Array(w).fill(0));
const visited = Array.from(Array(h), () => Array(w).fill(false));
const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

for (let i = 1; i <= k; i++) {
    // 사각형의 꼭지점 좌표 (왼쪽아래, 오른쪽 위)
    const [y1, x1, y2, x2] = input[i].split(" ").map(Number);
    // 사각형의 꼭지점 안쪽에 해당하는 구역을 처리
    for (let x = h - x2; x < h - x1; x++) {
        for (let y = y1; y < y2; y++) {
            // 해당하는 구역은 1로 변환.
            graph[x][y] = 1;
        }
    }
}

let cnt = 0;

const result = [];

for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
        cnt = 0; // 구역별로 카운트 초기화.
        if (!graph[i][j] && !visited[i][j]) {
            dfs(i, j);
            result.push(cnt);
        }
    }
}

console.log(result.length);
console.log(result.sort((a, b) => a - b).join(" "));
```

#### 함수코드
```js
const dfs = (x, y) => {
    cnt++;
    visited[x][y] = true;

    for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (nx >= 0 && nx < h && ny >= 0 && ny < w && !graph[nx][ny] && !visited[nx][ny]) dfs(nx, ny);
    }
};

```

### 어려웠던 점

처리할 구역의 좌표를 구하는 것에서 시간이 오래걸렸다. 

보통은 좌표를 직접적으로 알려주고 처리를 하는데 이번 문제는 범위만 주어진 것이다. 

범위를 가지고 좌표로 변환해서 해당 구역을 처리하는데 아이디어를 떠올리기 힘들었다.

초반에 높이와 넓이를 반대로 읽어서 더 오래걸린듯 하다.