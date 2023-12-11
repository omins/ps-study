## 2110번 문제

[문제 링크](https://www.acmicpc.net/problem/2110)

### 풀이코드

```js
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [NC, ...rest] = fs.readFileSync(filePath).toString().trim().split('\n');
const [_, numRouter] = NC.split(' ').map(Number);
const houses = sort(rest.map(Number));
const MAX_DISTANCE = 1_000_000_000;

const answer = search({ houses, maxDistance: MAX_DISTANCE, numRouter });
console.log(answer);

function search({ houses, maxDistance, numRouter }) {
  let start = 1;
  let end = maxDistance;
  let answer = 1;

  while (start <= end) {
    const distance = Math.floor((start + end) / 2);

    if (isPortable({ houses, distance, maxDistance, numRouter })) {
      answer = distance;
      start = distance + 1;
    } else {
      end = distance - 1;
    }
  }

  return answer;
}

function isPortable({ houses, distance, maxDistance, numRouter }) {
  let prevHouse = -maxDistance;
  let portedCount = 0;

  for (let house of houses) {
    if (portedCount === numRouter) break;
    if (house - prevHouse < distance) continue;

    portedCount++;
    prevHouse = house;
  }

  return portedCount === numRouter;
}

function sort(arr) {
  if (arr.length <= 1) return arr;

  const center = Math.floor(arr.length / 2);
  const left = sort(arr.slice(0, center));
  const right = sort(arr.slice(center));

  return merge(left, right);
}

function merge(left, right) {
  const temp = [];
  let leftIdx = 0;
  let rightIdx = 0;

  while (leftIdx < left.length && rightIdx < right.length) {
    if (left[leftIdx] < right[rightIdx]) {
      temp.push(left[leftIdx++]);
    } else {
      temp.push(right[rightIdx++]);
    }
  }

  return temp.concat(left.slice(leftIdx), right.slice(rightIdx));
}
```

### 생각한 것

1. 주어진 공유기 수 `numRouter`를 배치할 때, 가장 인접한 두 공유기의 거리가 최대가 될 수 있도록 배치하는 경우 그 거리를 찾는다.
2. 집의 좌표는 0 ~ 1e9 사이의 값이다. 즉 최대 1e9 거리를 도출할 수 있다.
3. 한 위치에 하나의 집만 있고, 한 위치에 하나의 공유기만 위치시킬 수 있다. 따라서 최소 각 집은 1의 거리를 가진다.
4. 1부터 1e9 범위를 이분탐색하여서 해당 거리만큼 확보했을 때 모든 공유기를 놓을 수 있는지 검사한다.
5. 모든 공유기를 놓을 수 없다면, 더 작은 수로 범위를 좁히고, 모든 공유기를 놓을 수 있다면 더 큰 수로 범위를 좁힌다. 놓을 수 있는 최대 거리까지 탐색한다.

### 시간 복잡도

$O(N log N)$

### 사용한 자료구조 / 알고리즘

- 이분탐색

### 난이도 / 걸린 시간

- 골드4 / 45분
