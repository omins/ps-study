# 문제풀이

[문제링크](https://www.acmicpc.net/problem/2670)

#### 난이도, 소요시간(분)

실버 4, 20

## 문제설명

N개의 실수가 있을 때, 한 개 이상의 연속된 수들의 곱이 최대가 되는 부분을 찾아, 그 곱을 출력하는 프로그램을 작성하시오.

```
input
8
1.1
0.7
1.3
0.9
1.4
0.8
0.7
1.4
```

## 풀이코드

```js
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");
const n = Number(input[0]);
const dp = [];

for (let i = 1; i <= n; i++) {
  dp.push(Number(input[i]));
}

for (let i = 1; i < n; i++) {
  dp[i] = Math.max(dp[i], dp[i] * dp[i - 1]);
}

console.log(Math.max(...dp).toFixed(3));
```

## 생각한 것

- 숫자 배열을 그대로 dp 테이블로 활용할 수 있다.
- 값이 커지는 부분을 찾아야 한다.
- 곱의 연산은 이전 인덱스의 값만 참조하면 된다. (수가 증가되는지 혹은 감소되는지)

### 점화식

- `dp[i] = Math.max(dp[i], dp[i] * dp[i - 1])`
- 이전 값과 곱하여 현재 값보다 커지는지 확인한다.
