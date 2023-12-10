## 3020번 문제

[문제 링크](https://www.acmicpc.net/problem/3020)

### 풀이코드

```js
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [NH, ...rest] = fs.readFileSync(filePath).toString().trim().split('\n');
const [_, H] = NH.split(' ').map(Number);

let rockBelow = [];
let rockAbove = [];

rest.forEach((rock, idx) => {
  if (idx % 2 === 0) {
    rockBelow.push(Number(rock));
  } else {
    rockAbove.push(Number(rock));
  }
});

rockBelow = sort(rockBelow);
rockAbove = sort(rockAbove);

let count = 0;
let minValue = Infinity;

for (let i = 1; i <= H; i++) {
  const cutBelow = rockBelow.length - indexOfUpperBound(rockBelow, i - 1);
  const cutAbove = rockAbove.length - indexOfUpperBound(rockAbove, H - i);
  const sum = cutBelow + cutAbove;

  if (sum < minValue) {
    minValue = sum;
    count = 1;
  } else if (minValue === sum) {
    count++;
  }
}

console.log(minValue, count);

function indexOfUpperBound(arr, target) {
  let start = 0;
  let end = arr.length;

  while (start < end) {
    const mid = Math.floor((start + end) / 2);

    if (arr[mid] <= target) {
      start = mid + 1;
    } else {
      end = mid;
    }
  }

  return end;
}

function sort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = sort(arr.slice(0, mid));
  const right = sort(arr.slice(mid));

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
```

### 생각한 것

1. 처음에는 N개의 바위를 뚫는 경우의 수를 모두 보고, 바위를 뚫는 높이 H의 경우의 수를 이분탐색 하려했다. 높이 H를 이분탐색하며, N개의 바위를 뚫는 것이다. 적정한 범위만 지정된다면 $O(N log N)$으로 풀어낼 수 있다.
2. 하지만 범위를 지정하는 것이 병목이었다. 바위는 아래서도 자라고(석순), 위에서도 자란다(종유석). 따라서 탐색 범위를 최적화 할 수 없었다. 높이 h에 대해 뚫어야 하는 바위 n의 수는 대소관계가 명확하기 않기 때문이다.
3. 2시간을 넘게 풀이하면서 세웠던 가설 1번은, H의 중간 지점에서 둘로 나누어서 이분탐색을 두 번하면 될 것이다 라는 가설이다. 종유석과 석순은 아래와 위에서 자라기 때문에 이 특성을 이용해서 각각의 최솟값을 구할 수 있지 않을까 생각했다. -> 일반화 할 수 없어 실패. 가설 2번은, 석순과 종유석을 나누어서 높이 h에 대해 뚫어야 하는 n을 구해 각각 더한다 라는 가설이다. -> 풀이를 구체화하지 못해서 실패.
4. 결국 풀이를 봤는데, Upper bound라는 개념을 이용해서 풀어낼 수 있는 문제였다. upper bound는 target보다 큰 원소 중 가장 앞 순서인 원소의 index를 반환하는 알고리즘이다. 이 알고리즘도 이분탐색 기법을 활용하기에 시간복잡도는 $O(log N)$ 이다.
5. 내가 생각했던 접근법과 다른 점.
   - 모든 N에 대해 탐색하지 않고, 모든 H에 대해 탐색했다. 뚫어야 하는 바위의 수를 구할 때는 upper bound를 이용해 계산했다.
   - 현재 target보다 큰 값 === 뚫어야 하는 바위의 시작점이고, 배열은 오름차순 정렬이기 때문에 이후 바위를 탐색하지 않아도 (전체 길이 - 뚫어야 하는 바위 시작 index) 로 몇개의 바위를 더 뚫어야 하는지 알 수 있다.
   - 석순과 종유석은 각각 i - 1, H - i로 target 값을 지정해주면 된다.
   - 최솟값과, 빈도를 구해 출력한다.

### 시간 복잡도

$O(N log N)$

### 사용한 자료구조 / 알고리즘

- 이분탐색 / Upper bound

### 코멘트

- 생각의 전환이 필요했다. 높이 H가 이분탐색이라고만 생각해서 풀지 못했다.

### 난이도 / 걸린 시간

- 골드5 / 2시간 30분

### 참고자료

- https://yoongrammer.tistory.com/105
- https://velog.io/@dkslwdms2121/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98%EC%9D%B4%EC%A7%84-%ED%83%90%EC%83%89%EB%B0%B1%EC%A4%803020%EB%B2%88%EA%B0%9C%EB%98%A5%EB%B2%8C%EB%A0%88python
