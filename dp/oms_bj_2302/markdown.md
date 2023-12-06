# 문제풀이

[문제링크](https://www.acmicpc.net/problem/2302)

#### 난이도, 풀이시간

실버 1, 70분

## 문제설명

어떤 극장의 좌석은 한 줄로 되어 있으며 왼쪽부터 차례대로 1번부터 N번까지 번호가 매겨져 있다. 공연을 보러 온 사람들은 자기의 입장권에 표시되어 있는 좌석에 앉아야 한다. 예를 들어서, 입장권에 5번이 쓰여 있으면 5번 좌석에 앉아야 한다. 단, 자기의 바로 왼쪽 좌석 또는 바로 오른쪽 좌석으로는 자리를 옮길 수 있다. 예를 들어서, 7번 입장권을 가진 사람은 7번 좌석은 물론이고, 6번 좌석이나 8번 좌석에도 앉을 수 있다. 그러나 5번 좌석이나 9번 좌석에는 앉을 수 없다.

그런데 이 극장에는 “VIP 회원”들이 있다. 이 사람들은 반드시 자기 좌석에만 앉아야 하며 옆 좌석으로 자리를 옮길 수 없다.

오늘 공연은 입장권이 매진되어 1번 좌석부터 N번 좌석까지 모든 좌석이 다 팔렸다. VIP 회원들의 좌석 번호들이 주어졌을 때, 사람들이 좌석에 앉는 서로 다른 방법의 가짓수를 구하는 프로그램을 작성하시오.

예를 들어서, 그림과 같이 좌석이 9개이고, 4번 좌석과 7번 좌석이 VIP석인 경우에 <123456789>는 물론 가능한 배치이다. 또한 <213465789> 와 <132465798> 도 가능한 배치이다. 그러나 <312456789> 와 <123546789> 는 허용되지 않는 배치 방법이다.

## 풀이코드

```js
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const n = Number(input[0]);
const m = Number(input[1]);

// 피보나치 수열
const d = new Array(n + 1).fill(0);
d[0] = 1;
d[1] = 1;
d[2] = 2;

function dp(x) {
  if (d[x] !== 0) {
    return d[x];
  }
  d[x] = dp(x - 1) + dp(x - 2);
  return d[x];
}

// vip석을 기준으로 나누었을 때 각 좌석의 개수 구하기
const arr = [];
let start = 0;

for (let i = 2; i < m + 2; i++) {
  end = Number(input[i]);
  arr.push(end - 1 - start);
  start = end;
}
arr.push(n - start);

// 최종 정답 구하기
let answer = 1;
for (let x of arr) {
  answer *= dp(x);
}

console.log(answer);
```

## 생각한 것

- n개의 좌석을 양 옆만 바꿔 앉을 수 있는 경우의 수는 피보나치 수열과 동일하다.
- vip석을 기준으로 좌석을 분리했을 때 각 구역의 좌석 개수를 x라고 가정하고 각 구역의 fibo(x)의 값을 모두 곱한 값이 정답이 된다.

```
n = 9, m = 2, vip = 4, 7

전체 좌석 -> [1, 2, 3, 4, 5, 6, 7, 8, 9]

vip석을 기준으로 분리 -> [1, 2, 3], [5, 6], [8, 9]

answer -> dp(3) * dp(2) * dp(2)
```
