# 문제풀이

[문제링크](https://www.acmicpc.net/problem/16401)

난이도(실버2), 풀이시간(70분)

## 문제설명

명절이 되면, 홍익이 집에는 조카들이 놀러 온다. 떼를 쓰는 조카들을 달래기 위해 홍익이는 막대 과자를 하나씩 나눠준다.

조카들이 과자를 먹는 동안은 떼를 쓰지 않기 때문에, 홍익이는 조카들에게 최대한 긴 과자를 나눠주려고 한다.

그런데 나눠준 과자의 길이가 하나라도 다르면 조카끼리 싸움이 일어난다. 따라서 반드시 모든 조카에게 같은 길이의 막대 과자를 나눠주어야 한다.

M명의 조카가 있고 N개의 과자가 있을 때, 조카 1명에게 줄 수 있는 막대 과자의 최대 길이를 구하라.

단, 막대 과자는 길이와 상관없이 여러 조각으로 나눠질 수 있지만, 과자를 하나로 합칠 수는 없다. 단, 막대 과자의 길이는 양의 정수여야 한다.

## 풀이코드

1차 메모리 초과

```js
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const [m, n] = input[0].split(" ").map(Number);
const arr = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
let min = 1;
let max = Math.max(...arr);
let result = 0;

while (min <= max) {
  let cnt = 0;
  const mid = parseInt((min + max) / 2);

  for (let snack of arr) {
    cnt += parseInt(snack / mid);
  }

  if (cnt >= m) {
    result = mid;
    min = mid + 1;
  } else {
    max = mid - 1;
  }
}

console.log(result);
```

2차 통과

```js
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const [m, n] = input[0].split(" ").map(Number);
const arr = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
let min = 1;
let max = 1000000000;
let result = 0;

while (min <= max) {
  let cnt = 0;
  const mid = Math.floor((min + max) / 2);

  for (let snack of arr) {
    cnt += Math.floor(snack / mid);
  }

  if (cnt >= m) {
    result = mid;
    min = mid + 1;
  } else {
    max = mid - 1;
  }
}

console.log(result);
```

## 생각한 것

과자의 길이는 늘어나거나 줄어드는 방식으로 조절이 가능한 단조증가 혹은 단조감소의 형태로 처리할 수 있기 때문에 이분탐색을 활용할 수 있다.

- 과자의 최소길이 1, 최대길이 1000000000을 min과 max로 설정하여 이분탐색을 시작한다.(while(min <= max))
- mid의 값은 조카들에게 나누어줄 과자의 길이로 사용할 수 있다.
- mid의 값을 이용해 현재 가지고 있는 과자들의 길이에 나누기 연산을 실행하여 값을 cnt 변수에 더해준다.
- cnt의 값이 조카들의 수 m보다 작다면 mid의 값이 크다는 의미이기 때문에 max를 mid - 1로 변경해준다.
- cnt의 값이 조카들의 수 m보다 크거나 같다면 min을 mid + 1로 변경해주고 result의 값을 mid로 변경한다.
- 이분탐색이 종료되면 result를 출력한다.

## 어려웠던 부분

처음 풀이를 보면 max 값을 구하는 과정에서 Math.max를 사용하고 나누기 연산의 값을 구하는 과정에서 parseInt를 사용한다. 그러다 보니 메모리 값을 너무 많이 사용하게 되어서 문제를 해결하지 못했다. 그래서 최종적으로 max의 값은 하드코딩으로 할당하고 parseInt 대신 Math.floor를 사용하여 메모리 초과를 해결할 수 있었다.

- max 값을 구하는 과정에서 Math.max를 사용하지 않았을 경우 10000kb 정도 차이가 나는 것을 확인할 수 있었다.
- parseInt는 문자열을 파싱하여 정수의 값을 반환한다. 문자열은 문자 하나당 메모리를 차지하게 된다. ("100" => "1","0","0" 개별 메모리 사용)
