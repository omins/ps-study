# 문제 풀이
[문제 링크](https://www.acmicpc.net/problem/25305)

### 어떻게 풀었나?

단순하게 정렬을 이용하여 해당 인덱스를 출력해도 가능한 문제이나
병합정렬을 연습하기 위해서 병합정렬을 이용하여 풀어보았다.

---
### 병합정렬?

병합정렬이란 문제를 계속해서 분할하여 합치는 과정에서 정렬을 진행한다.
이 과정에서 보통 재귀함수를 만들어 사용한다.
만약 주어진 범위가 크지 않다면 일반적인 정렬과 크게 다르지 않지만
주어진 범위가 넓다면 매우 효율적으로 사용할 수 있다. 
병합정렬은 시간복잡도 면에서 유리한 것은 사실이나 정렬과정에서 하나의 배열을 새로 만들어야 하기에 **메모리적으로 조금 손해를 보게 된다.**
그리고 병합정렬은 시간복잡도 **(n Log n)** 을 보장한다.

---
### 풀이 코드

```js
function mergeSort(arr) {
  if (arr.length < 2) return arr;
  let half = Math.floor(arr.length / 2);
  let left = arr.slice(0, half);
  let right = arr.slice(half, arr.length);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  const result = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  while (left.length) result.push(left.shift());
  while (right.length) result.push(right.shift());
  return result;
}

const input = require("fs")
  .readFileSync("./0920.txt")
  .toString()
  .trim()
  .split("\n");

const [n, k] = input[0].split(" ").map(Number);

const arr = input[1].split(" ").map(Number);

const sortedArr = mergeSort(arr);

console.log(sortedArr[n - k]);
```