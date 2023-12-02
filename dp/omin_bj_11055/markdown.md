## 11055번 문제

[문제 링크](https://www.acmicpc.net/problem/11055)

### 풀이코드

```js
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [_, inputs] = fs.readFileSync(filePath).toString().trim().split('\n');
const numbers = inputs.split(' ').map(Number);

const cache = new Map();
cache.set(0, numbers[0]);

for (let i = 1; i < numbers.length; i++) {
  let maxValue = 0;

  for (let j = 0; j < i; j++) {
    if (numbers[j] >= numbers[i]) continue;
    const cachedValue = cache.get(j);
    maxValue = Math.max(numbers[i] + cachedValue, maxValue);
  }

  cache.set(i, maxValue || numbers[i]);
}

console.log(Math.max(...cache.values()));
```

### 생각한 것

1. 현재 위치 원소의 부분 수열 합은 이전 원소 중 현재 원소 보다 작은 원소의 부분 수열 합 + 현재 원소이다.
2. 현재 원소에서 하나씩 인덱스를 줄여가며 현재 원소보다 작은 원소를 찾으면 해당 원소의 부분 수열 합과 현재 원소를 더해 부분 수열 합을 캐시에 저장한다.

   ```js
   for (let i = 1; i < numbers.length; i++) {
     for (let j = i - 1; j >= 0; j--) {
       if (numbers[j] >= numbers[i]) continue;

       const prev = cache.get(j);
       const cur = prev + numbers[i];
       cache.set(i, cur);
       break;
     }

     if (!cache.has(i)) {
       cache.set(i, numbers[i]);
     }
   }
   ```

3. 하지만 이 방법에 반례가 있었다. 아래 테스트케이스에서는 현재 원소보다 작은 수 중 첫 번째로 만나는 원소의 부분 수열 합을 취하면 최적의 해를 찾지 못한다.

   - 1 2 3 4 5를 구해야 하는데, 1 2 4 5를 구하게 된다.

     ```
     1 2 3 1 2 5 4 5
     ```

4. 따라서 현재 원소와 합칠 수 있는(크기가 더 작은) 원소 중 부분 수열 합이 가장 큰 값을 찾아서 더해주어야 최적의 해를 찾을 수 있다.

   ```js
   for (let i = 1; i < numbers.length; i++) {
     let maxValue = 0;

     for (let j = 0; j < i; j++) {
       if (numbers[j] >= numbers[i]) continue;
       const cachedValue = cache.get(j);
       maxValue = Math.max(numbers[i] + cachedValue, maxValue);
     }
     cache.set(i, maxValue || numbers[i]);
   }
   ```

### 시간 복잡도

$O(N^2)$

### 사용한 자료구조 / 알고리즘

맵 / DP

### 코멘트

- 반례를 먼저 떠올려보아야 한다.

### 난이도 / 걸린 시간

- 실버2 / 1시간 30분
