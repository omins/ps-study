function isValidation(x, y) {
    if (x >= 0 && x < M && y >= 0 && y < N) {
        return true;
    }
    return false;
}

function dfs(x, y) {
    if (x === M - 1 && y === N - 1) {
        return 1; // 최종지점의 도착하면 1을 리턴해서 거쳐온 경로들을 방문처리
    }

    if (dp[x][y] !== -1) {
        return dp[x][y]; // 이미 방문한 경로라면 현재 경로에 누적된 값을 리턴
    }

    let cnt = 0;

    for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (isValidation(nx, ny) && graph[x][y] > graph[nx][ny]) {
            // 분기점에서 cnt 가 누적되고 누적된 카운트가 출발점에 쌓여서 최종으로 이동가능한 경로의 수가 기록된다.
            // 예시 => 1,0 에서 이동 가능한 경로가 [1,1], [2,0] 이라면 1,0 은 2의 값을 가지게 되고 1,0이 거쳐온 모든 경로도 동일한 값이 기록된다.(새로운 분기점을 만나기 전까지의 경로)
            // dp의 각노드에 기록된 수는 해당 노드를 거쳐서 이동할 수 있는 경로의 수.
            cnt += dfs(nx, ny); 
        }
    }
    dp[x][y] = cnt;
    return cnt;
}

const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const [M, N] = input.shift().split(" ").map(Number);
const graph = input.map(v => v.split(" ").map(Number));
const dp = new Array(M).fill(null).map(() => new Array(N).fill(-1));
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

console.log(dfs(0, 0));