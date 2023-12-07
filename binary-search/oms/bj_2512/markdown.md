# 문제풀이

[문제링크](https://www.acmicpc.net/problem/2512)

#### 난이도, 풀이시간

실버 2, 40분

## 문제설명

국가의 역할 중 하나는 여러 지방의 예산요청을 심사하여 국가의 예산을 분배하는 것이다. 국가예산의 총액은 미리 정해져 있어서 모든 예산요청을 배정해 주기는 어려울 수도 있다. 그래서 정해진 총액 이하에서 가능한 한 최대의 총 예산을 다음과 같은 방법으로 배정한다.

1. 모든 요청이 배정될 수 있는 경우에는 요청한 금액을 그대로 배정한다.
2. 모든 요청이 배정될 수 없는 경우에는 특정한 정수 상한액을 계산하여 그 이상인 예산요청에는 모두 상한액을 배정한다. 상한액 이하의 예산요청에 대해서는 요청한 금액을 그대로 배정한다.

예를 들어, 전체 국가예산이 485이고 4개 지방의 예산요청이 각각 120, 110, 140, 150이라고 하자. 이 경우, 상한액을 127로 잡으면, 위의 요청들에 대해서 각각 120, 110, 127, 127을 배정하고 그 합이 484로 가능한 최대가 된다.

여러 지방의 예산요청과 국가예산의 총액이 주어졌을 때, 위의 조건을 모두 만족하도록 예산을 배정하는 프로그램을 작성하시오.

## 풀이코드

```js
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const n = Number(input[0]);
const arr = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
const totalMoney = Number(input[2]);
let start = 1;
let end = Math.max(...arr);
let answer = 0;

while (start <= end) {
  let cur = 0;
  const mid = parseInt((start + end) / 2);

  for (let x of arr) {
    cur += Math.min(mid, x);
  }

  if (cur <= totalMoney) {
    answer = mid;
    start = mid + 1;
  } else {
    end = mid - 1;
  }
}

console.log(answer);
```

- start를 0으로 end를 도시에서 요청한 금액 중에서 가장 큰 금액으로 초기화한다.
- mid의 값이 최대 상한 금액이 될 때 까지 이진 탐색을 진행한다.
  - 상한 금액을 확인할 cur을 0으로 초기화 한다.
  - 도시의 요청 금액을 확인하면서 mid 보다 큰 금액은 cur + mid를 해주고 mid 보다 작은 금액은 cur + 도시 요청 금액을 진행한다.
  - 최종 cur 값이 총 예산 보다 크다면 end = mid - 1로 변경한다.
  - 최종 cur 값이 총 예산 보다 작다면 answer를 mid 값으로 변경하고 start = mid + 1로 변경한다.

## 생각한 것

- 금액이라는 숫자는 단조 증가의 형태를 가지고 있기 때문에 이진 탐색을 이용해서 해결할 수 있다.
- mid의 값이 곧 우리가 구해야 하는 최대 상한 금액으로 이해할 수 있다.
