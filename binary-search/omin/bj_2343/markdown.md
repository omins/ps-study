## 2343번 문제

[문제 링크](https://www.acmicpc.net/problem/2343)

### 풀이코드

```js
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';

const [NM, rest] = fs.readFileSync(filePath).toString().trim().split('\n');
const lectures = rest.split(' ').map(Number);
const [_, diskCount] = NM.split(' ').map(Number);
const MAX_SIZE = 1_000_000_000;

console.log(search(lectures, diskCount, MAX_SIZE));

function search(lectures, count, maxSize) {
  let start = 0;
  let end = maxSize;
  let optimalSize = 0;

  while (start <= end) {
    const size = Math.floor((start + end) / 2);

    if (isLectureRecodable(lectures, count, size)) {
      optimalSize = size;
      end = size - 1;
    } else {
      start = size + 1;
    }
  }

  return optimalSize;
}

function isLectureRecodable(lectures, count, size) {
  let idx = 0;

  for (let i = 0; i < count; i++) {
    let sum = 0;

    while (true) {
      if (idx === lectures.length) return true;
      if (sum + lectures[idx] > size) break;

      sum += lectures[idx];
      idx++;
    }
  }

  return false;
}
```

### 생각한 것

1. 블루레이 크기를 최소로 하는 방법을 찾기 위해서는 최대 1,000,000,000개의 경우의 수를 모두 보는 방법도 있지만, 이분탐색으로 이를 효율적으로 탐색할 수 있다.

2. 임의의 블루레이 크기를 정하고, 이 크기를 갖는 M개의 블루레이에 강의를 나누어 담을 수 있는지 확인해야 한다. 제약 조건으로는 강의의 순서를 바꿀 수 없고, 블루레이 크기가 모두 같아야 한다.
3. 강의의 순서는 바꿀 수 없고, 모든 블루레이 크기는 같다는 제약이 있다. 최적의 조합으로 강의를 골라 녹화할 수 없기 때문에 현재 블루레이에 녹화할 수 있는 만큼 최대한, 그리고 순차적으로 담아야 한다.
4. 최악의 경우 1개의 블루레이에 10,000분짜리 강의 100,000개를 담아야 하기 때문에 최대 범위는 1,000,000,000으로 설정한다.
5. 이분탐색하면서 탐색하는 숫자 크기의 블루레이에 강의를 담을 수 있는지 탐색하고, 이 값이 최소가 되도록 최솟값을 갱신한다.

### 시간 복잡도

$O(N log N)$

### 사용한 자료구조 / 알고리즘

- 이분탐색

### 코멘트

### 난이도 / 걸린 시간

- 실버1 / 1시간 16분
