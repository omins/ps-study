## 문제풀이
[문제링크](https://www.acmicpc.net/problem/1388)

문제 난이도: 실버 4

소요시간 : 1시간

### 문제접근
두가지 경우의 수만 생각하면 된다. 가로로 이어지는 경우, 세로로 이어지는 경우
각각의 경우의 수를 따로 확인하며 카운트를 진행한다.
* 각각의 경우의 수를 보면서 줄마다 flag로 현재 줄에서 확인중이 원소를 만났는지 체크한다.
* 만약 확인중인 원소를 만났다면 flag를 false로 변경해주고 cnt 를 진행한다. (같은 원소가 연결되는 상황에서 또 카운트를 하지 않기 위해)
* 만약 현재 확인중인 원소와 다른 원소를 만나면 다시 flag를 true로 바꿔준다.(다시 확인중인 원소를 만나면 카운트를 진행하기 위함)

1. 가로세로 최대 50 이기 때문에 최대 2500칸 이다. 
2. 모든 칸을 확인해도 1억번의 연산이 넘지 않기 때문에 시간제한에 걸리지 않는다. 
3. 이중 반복문을 사용해도 충분히 해결가능하다.

### 문제코드
```js
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const [nm, ...arr] = fs.readFileSync(filepath).toString().trim().split("\n");
const [n, m] = nm.split(" ").map(e => +e);
const graph = arr.map(e => e.split(""));
let cnt = 0;

// 가로 먼저 탐색
for (let i = 0; i < n; i++) {
    let flag = true;
    for (let j = 0; j < m; j++) {
        if (flag && graph[i][j] === "-") {
            cnt++;
            flag = false;
        } else if (graph[i][j] === "|") flag = true;
    }
}

// 세로 먼저 탐색
for (let j = 0; j < m; j++) {
    let flag = true;
    for (let i = 0; i < n; i++) {
        if (flag && graph[i][j] === "|") {
            cnt++;
            flag = false;
        } else if (graph[i][j] === "-") flag = true;
    }
}

console.log(cnt);
```