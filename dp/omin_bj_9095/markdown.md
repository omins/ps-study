## 9095번 문제

[문제 링크](https://www.acmicpc.net/problem/9095)

### 풀이코드

```js
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [_, ...rest] = fs.readFileSync(filePath).toString().trim().split('\n');
const testCases = rest.map(Number);

const answers = [];
const addNums = [1, 2, 3];

testCases.forEach(target => {
  const memo = {};
  const answer = dfs(target, 0, memo);
  answers.push(answer);
});

console.log(answers.join('\n'));

function dfs(target, sum, memo) {
  if (sum in memo) return memo[sum];
  if (sum === target) return 1;

  let currentSum = 0;

  addNums.forEach(addNum => {
    const nextSum = sum + addNum;
    if (nextSum <= target) {
      currentSum += dfs(target, nextSum, memo);
    }
  });

  memo[sum] = currentSum;
  return currentSum;
}
```

### 생각한 것

1. 단순한 해법: 0에서 시작하여 n이 될 때까지 재귀적으로 1, 2, 3을 더한다. 이때 1, 2, 3을 더했을 때 목표하는 숫자보다 작거나 같은 경우에만 계속 더한다.
2. 하지만 단순한 해법으로는 매 단계마다 1, 2, 3을 더하기에 중복되는 연산이 있다. 가령 2에서 4를 만드는 경우의 수는 항상 같은데, 0 -> 0+1 -> 1+1의 경우와 0 -> 0+2 모두 2에서 4까지의 경우의 수를 재귀적으로 구해야 한다.
3. 따라서 메모이제이션을 활용해 중복되는 연산은 수행하지 않도록 트리의 가지를 pruning 하면 더 효율적으로 문제를 해결할 수 있다.
   - 지금까지의 sum은 n까지 몇 개의 경우의 수가 있는지 저장하고, 이를 계속해서 활용한다.

### 시간 복잡도

$O(N)$

### 사용한 자료구조 / 알고리즘

DFS, DP

### 코멘트

- 중복되는 연산이 무엇인지 파악해야 한다.

### 난이도 / 걸린 시간

- 실버3 / 1시간 5분
