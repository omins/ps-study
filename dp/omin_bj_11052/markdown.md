## 11052번 문제

[문제 링크](https://www.acmicpc.net/problem/11052)

### 풀이코드

```js
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [n, rest] = fs.readFileSync(filePath).toString().trim().split('\n');
const packCosts = rest.split(' ').map(Number);

const maxValues = new Map();
maxValues.set(0, packCosts[0]);

for (let i = 1; i < packCosts.length; i++) {
  let currentMaxValue = packCosts[i];

  for (let j = 1; j <= Math.round(i / 2); j++) {
    const calculated = maxValues.get(i - j) + maxValues.get(j - 1);
    currentMaxValue = Math.max(currentMaxValue, calculated);
  }

  maxValues.set(i, currentMaxValue);
}

console.log(maxValues.get(Number(n) - 1));
```

### 생각한 것

1. 처음에는 매 선택지마다 경우의 수를 고려하며 문제를 해결했다. 하지만 N!의 시간 복잡도로 시간초과다.

   ```js
   const memo = new Map();
   let maxCost = -Infinity;

   packCosts.forEach((_, idx, origin) => {
     const packNumber = idx + 1;
     const cost = calculateCost(packNumber, packNumber, origin, memo, N);
     maxCost = Math.max(maxCost, cost);
   });

   console.log(maxCost);

   function calculateCost(sumOfPack, packNumber, packCosts, memo, N) {
     const key = `${sumOfPack},${packNumber}`;
     if (memo.has(key)) return memo.get(key);

     const packCost = packCosts[packNumber - 1];
     if (sumOfPack === N) {
       memo.set(key, packCost);
       return packCost;
     }

     let localMax = -Infinity;

     for (let i = 1; i <= N - sumOfPack; i++) {
       const childCost = calculateCost(sumOfPack + i, i, packCosts, memo, N);
       localMax = Math.max(localMax, packCost + childCost);
     }

     memo.set(key, localMax);
     return localMax;
   }
   ```

2. 일반화 할 수 있는 규칙을 찾기 위해서 a - 1, a - 2항과 어떤 연관관계가 있는지 찾던 중 현재항 a부터 첫번째 항까지 -1씩 더해가며 답을 구할 수 있다는 것을 알게 되었다.

3. 점화식으로 표현하면, $a_i$ = max($v_i$, $a_{i-1}$ + $a_1$, $a_{i-2}$ + $a_2$, ... , $a_1$ + $a_{i-1}$) 이다

### 시간 복잡도

$O(N^2)$

### 사용한 자료구조 / 알고리즘

- 맵 / DP

### 코멘트

- 규칙을 찾는 데 오래걸렸다. DP 문제라고 생각되면 식을 점화식부터 찾아보는 연습이 더 필요하다.

### 난이도 / 걸린 시간

- 실버1 / 2시간
