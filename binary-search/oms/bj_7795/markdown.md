# 문제풀이

[문제링크](https://www.acmicpc.net/problem/7795)

### 난이도, 소요시간

실버 3, 40분

## 문제설명

심해에는 두 종류의 생명체 A와 B가 존재한다. A는 B를 먹는다. A는 자기보다 크기가 작은 먹이만 먹을 수 있다. 예를 들어, A의 크기가 {8, 1, 7, 3, 1}이고, B의 크기가 {3, 6, 1}인 경우에 A가 B를 먹을 수 있는 쌍의 개수는 7가지가 있다. 8-3, 8-6, 8-1, 7-3, 7-6, 7-1, 3-1.

두 생명체 A와 B의 크기가 주어졌을 때, A의 크기가 B보다 큰 쌍이 몇 개나 있는지 구하는 프로그램을 작성하시오.

## 풀이코드

```js
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");
const tc = Number(input[0]);
let line = 1;

function lowerBound(arr, t, s, e) {
  while (s < e) {
    const mid = parseInt((s + e) / 2);
    if (arr[mid] >= t) e = mid;
    else s = mid + 1;
  }
  return e;
}

function upperBound(arr, t, s, e) {
  while (s < e) {
    const mid = parseInt((s + e) / 2);
    if (arr[mid] > t) e = mid;
    else s = mid + 1;
  }
  return e;
}

function countByRange(arr, rightValue, leftValue) {
  const rightIndex = upperBound(arr, rightValue, 0, arr.length);
  const leftIndex = lowerBound(arr, leftValue, 0, arr.length);
  return rightIndex - leftIndex;
}

for (let i = 0; i < tc; i++) {
  let result = 0;
  const arrA = input[line + 1].split(" ").map(Number);
  const arrB = input[line + 2]
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);

  arrA.forEach((num) => {
    const cur = countByRange(arrB, num - 1, 0);
    result += cur;
  });
  console.log(result);
  line += 3;
}
```

## 생각한 것

- 배열b를 오름차순으로 정렬하여 단조증가 형태로 만들면 이진탐색을 활용할 수 있다.
- 배열b에서 0 ~ 배열a[i] 범위에 해당하는 원소의 개수를 구한다.
- 범위를 구하는 과정에서 이진탐색을 활용할 수 있다.
