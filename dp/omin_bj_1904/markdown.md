## 1904번 문제

[문제 링크](https://www.acmicpc.net/problem/1904)

### 풀이코드

```js
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = Number(fs.readFileSync(filePath).toString());

console.log(fibonacci(input));

function fibonacci(n) {
  const cache = new Map();
  cache.set(0, 1);
  cache.set(1, 1);

  for (let i = 2; i <= n; i++) {
    const oneBefore = cache.get(i - 1);
    const twoBefore = cache.get(i - 2);
    const current = oneBefore + twoBefore;
    cache.set(i, current % 15746);
  }

  return cache.get(n);
}
```

### 생각한 것

1. 처음에는 트리 구조로 접근했다. 각 선택지마다 00을 선택하는 경우와 1을 선택하는 경우가 있을 수 있다.
2. 트리를 그리던 중 일종의 제약 사항이 있었다. 자릿수가 1개 남았는지, 2개 남았는지에 따라 경우의 수가 정해졌다. 이후 규칙을 작은 수부터 다시 세워봤다.

   - 남은 자릿수 1: 1 밖에 없다.
   - 남은 자릿수 2: 00, 11 밖에 없다.
   - 남은 자릿수 3:
     - 00, 11에 1을 더해 -> 001, 111.
     - 1에 00을 더해 -> 100
   - 남은 자릿수 4:

     - 100, 001, 111에 1을 더해 -> 1001, 0011, 1111
     - 00, 11에 00을 더해 -> 0000, 1100

   - (반복)

3. 이는 곧 피보나치 수열이므로, N번째 피보나치 수열을 구하여 출력한다.

### 시간 복잡도

$O(N)$

### 사용한 자료구조 / 알고리즘

맵 / 피보나치 수열

### 코멘트

- 피보나치 수를 저장할 때 나머지 연산을 해야 한다.

### 난이도 / 걸린 시간

- 실버3 / 50분
