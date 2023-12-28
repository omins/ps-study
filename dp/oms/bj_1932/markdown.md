# 문제풀이

[문제링크](https://www.acmicpc.net/problem/1932)

#### 문제 난이도, 풀이시간(분)

실버 1, 40

## 문제설명

```
    7
   3 8
  8 1 0
 2 7 4 4
4 5 2 6 5
```

위 그림은 크기가 5인 정수 삼각형의 한 모습이다.

맨 위층 7부터 시작해서 아래에 있는 수 중 하나를 선택하여 아래층으로 내려올 때, 이제까지 선택된 수의 합이 최대가 되는 경로를 구하는 프로그램을 작성하라. 아래층에 있는 수는 현재 층에서 선택된 수의 대각선 왼쪽 또는 대각선 오른쪽에 있는 것 중에서만 선택할 수 있다.

삼각형의 크기는 1 이상 500 이하이다. 삼각형을 이루고 있는 각 수는 모두 정수이며, 범위는 0 이상 9999 이하이다.

## 풀이코드

```js
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const n = Number(input.shift());
const dp = [];

for (let i = 0; i < n; i++) {
  dp.push(input[i].split(" ").map(Number));
}

for (let i = 1; i < n; i++) {
  for (let j = 0; j <= i; j++) {
    let a = 0;
    let b = 0;

    if (j !== 0) {
      a = dp[i - 1][j - 1] + dp[i][j];
    }
    if (j !== i) {
      b = dp[i - 1][j] + dp[i][j];
    }

    dp[i][j] = Math.max(a, b);
  }
}

console.log(Math.max(...dp[n - 1]));
```

## 생각한 것

- input으로 주어진 정수 삼각형을 dp 테이블로 활용하여 사용한다.
- 정수 삼각형의 위에서 아래로 내려가면서 현재 위치에서 가질수 있는 최대 값을 계산하여 재할당한다.
- dp[n - 1] 중에서 가장 큰 값을 출력한다.

### dp 테이블 초기 값 설정

- 추가적으로 dp를 생성하지 않고 정수 삼각형 자체를 dp 테이블의 초기 값으로 설정한다.

### 점화식

- 모든 항들은 자신의 바로 위 혹은 왼쪽 대각선 위의 항만을 더할 수 있다.
- 다음 두 가지 경우 중에서 더 큰 값을 현재 위치의 값으로 재할당 한다.
  - 바로 위에 있는 수를 더하는 경우 -> `dp[i][j] + dp[i-1][j]`
  - 대각선 위에 있는 수를 더하는 경우 -> `dp[i][j] + dp[i-1][j-1]`
