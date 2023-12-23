# 문제풀이

[문제링크](https://www.acmicpc.net/problem/2467)

난이도: 골드 5

소요시간: 60분

## 문제설명

KOI 부설 과학연구소에서는 많은 종류의 산성 용액과 알칼리성 용액을 보유하고 있다. 각 용액에는 그 용액의 특성을 나타내는 하나의 정수가 주어져있다. 산성 용액의 특성값은 1부터 1,000,000,000까지의 양의 정수로 나타내고, 알칼리성 용액의 특성값은 -1부터 -1,000,000,000까지의 음의 정수로 나타낸다.

같은 양의 두 용액을 혼합한 용액의 특성값은 혼합에 사용된 각 용액의 특성값의 합으로 정의한다. 이 연구소에서는 같은 양의 두 용액을 혼합하여 특성값이 0에 가장 가까운 용액을 만들려고 한다.

예를 들어, 주어진 용액들의 특성값이 [-99, -2, -1, 4, 98]인 경우에는 특성값이 -99인 용액과 특성값이 98인 용액을 혼합하면 특성값이 -1인 용액을 만들 수 있고, 이 용액의 특성값이 0에 가장 가까운 용액이다. 참고로, 두 종류의 알칼리성 용액만으로나 혹은 두 종류의 산성 용액만으로 특성값이 0에 가장 가까운 혼합 용액을 만드는 경우도 존재할 수 있다.

산성 용액과 알칼리성 용액의 특성값이 정렬된 순서로 주어졌을 때, 이 중 두 개의 서로 다른 용액을 혼합하여 특성값이 0에 가장 가까운 용액을 만들어내는 두 용액을 찾는 프로그램을 작성하시오.

## 정답코드

```js
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");
const n = Number(input[0]);
const liquid = input[1].split(" ").map(Number);
let gap = 2000000000;
let start = 0;
let end = n - 1;
const answer = Array.from({ length: 2 }, (v) => 0);

while (start < end) {
  const cur = liquid[start] + liquid[end];

  if (Math.abs(cur) < gap) {
    gap = Math.abs(cur);
    answer[0] = liquid[start];
    answer[1] = liquid[end];
  }

  if (cur < 0) {
    start += 1;
  } else {
    end -= 1;
  }
}

console.log(answer.join(" "));
```

## 생각한 것

- 용액들은 오름차순으로 정렬되어 있는 단조증가의 형태로 이분탐색을 활용할 수 있다.
- 배열의 양 끝점을 시작으로 안쪽으로 하나씩 좁혀가며 두 수의 차이를 구할 수 있다.
- 최대한 0에 가까운 수를 만들어야 하기에 현재 구한 값이 0보다 작다면 start를 한칸 안쪽으로 이동하고, 0보다 크다면 end를 안쪽으로 한칸 이동한다.

이분 탐색을 사용할 때 무조건 mid를 사용해야 한다는 고정관념 때문에 문제를 해결하는데 어려움을 겪었다.
