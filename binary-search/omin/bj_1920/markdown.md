## 1920번 문제

[문제 링크](https://www.acmicpc.net/problem/1920)

### 풀이코드

```js
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [, numbers, , targets] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const sortedNumbers = sort(numbers.split(' ').map(Number));
const answers = [];

targets
  .split(' ')
  .map(Number)
  .forEach(target => {
    const answer = hasTarget(sortedNumbers, target) ? 1 : 0;
    answers.push(answer);
  });

console.log(answers.join('\n'));

function sort(arr) {
  if (arr.length <= 1) return arr;

  const center = Math.round(arr.length / 2);
  const left = sort(arr.slice(0, center));
  const right = sort(arr.slice(center));

  return merge(left, right);
}

function merge(left, right) {
  let leftIdx = 0;
  let rightIdx = 0;
  const temp = [];

  while (leftIdx < left.length && rightIdx < right.length) {
    if (left[leftIdx] < right[rightIdx]) {
      temp.push(left[leftIdx++]);
    } else {
      temp.push(right[rightIdx++]);
    }
  }

  return temp.concat(left.slice(leftIdx), right.slice(rightIdx));
}

function hasTarget(arr, target) {
  let min = 0;
  let max = arr.length - 1;

  while (min <= max) {
    const center = Math.round((min + max) / 2);

    if (arr[center] === target) return true;
    if (arr[center] < target) {
      min = center + 1;
    } else {
      max = center - 1;
    }
  }

  return false;
}
```

### 생각한 것

1. 이진 탐색을 위해 우선 정렬하고, 각 타겟이 배열에 있는지 탐색한다.

### 시간 복잡도

$O(N log N)$

### 사용한 자료구조 / 알고리즘

- 배열 / 합병정렬, 이진탐색

### 코멘트

- 같은 문제를 두 번 푼 것인데, 이전에는 재귀로 이진 탐색을 구현했다면 이번에는 반복문으로 구현해보았다.

### 난이도 / 걸린 시간

- 실버4 / 30분
