## 2805번 문제

[문제 링크](https://www.acmicpc.net/problem/2805)

### 풀이코드

```js
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [NM, rest] = fs.readFileSync(filePath).toString().trim().split('\n');
const trees = rest.split(' ').map(Number);

const [_, target] = NM.split(' ').map(Number);
const MAX_HEIGHT = 1_000_000_000;

const answer = search(trees, MAX_HEIGHT, target);
console.log(answer);

function search(trees, max, target) {
  let start = 0;
  let end = max;
  let answer = 0;

  while (start <= end) {
    const height = Math.round((start + end) / 2);
    const cutResult = getCutTrees(trees, height);

    if (cutResult >= target) {
      answer = height;
      start = height + 1;
    } else {
      end = height - 1;
    }
  }

  return answer;
}

function getCutTrees(trees, height) {
  return trees.reduce(
    (acc, cur) => acc + (cur - height > 0 ? cur - height : 0),
    0
  );
}
```

### 생각한 것

1. 나무의 높이는 최소 0, 최대 10억이다. 나무를 어떤 높이에서 자르느냐에 따라 결과가 바뀐다. 따라서 10억의 높이는 모두 고려대상이다.
2. 10억의 높이를 $O(N)$ 의 복잡도로 탐색하면 시간 제한 내에 문제를 해결하지 못한다.
3. 0부터 10억까지의 수를 이분탐색하면서, 각 높이에서 얻을 수 있는 나무의 미터 수를 도출한다. 이는 N개의 나무를 높이 H로 자른 뒤 모두 더한 것이다. $log_2(1e9)$ 는 29.8... 이기 때문에 나무의 수 N에 대해 SUM 연산을 해도 최대 약 3천만번 연산한다.
4. 도출한 미터 수를 목표하는 미터 수와 비교한다. 만약 필요한 나무보다 더 많이 잘랐거나, 똑같이 잘랐다면 start를 현재 높이 + 1로 설정한다.
5. 필요한 나무보다 적게 잘랐다면 end를 현재 높이 - 1로 설정한다.
6. start와 end의 크기가 역전될 때까지 반복한다.

### 시간 복잡도

$O(N log M)$

### 사용한 자료구조 / 알고리즘

- 이분탐색

### 코멘트

- 높이를 최대한 높이려면 이분 탐색에서 현재 솔루션에서 멈추지 말고, 끝까지 탐색하며 답을 갱신해야 한다.

### 난이도 / 걸린 시간

- 실버2 / 57분
