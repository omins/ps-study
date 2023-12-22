## 10830번 문제

[문제 링크](https://www.acmicpc.net/problem/10830)

### 풀이코드

```js
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [NM, ...rest] = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = NM.split(' ').map(Number);
const MOD = 1000;
const board = rest.map(line => line.split(' ').map(elem => Number(elem) % MOD));

const matrix = powerMatrix(board, M);
printMatrix(matrix);

function powerMatrix(matrix, exponent) {
  if (exponent === 1) {
    return matrix;
  }

  const logMatrix = powerMatrix(matrix, Math.floor(exponent / 2));

  if (exponent % 2 === 0) {
    return multiplyMatrix(logMatrix, logMatrix);
  } else {
    return multiplyMatrix(multiplyMatrix(logMatrix, logMatrix), matrix);
  }
}

function multiplyMatrix(A, B) {
  const result = Array.from({ length: N }, () =>
    Array.from({ length: N }).fill(0)
  );

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      for (let k = 0; k < N; k++) {
        result[i][j] += A[i][k] * B[k][j];
      }

      result[i][j] %= MOD;
    }
  }

  return result;
}

function printMatrix(matrix) {
  matrix.forEach(line => {
    console.log(line.join(' '));
  });
}
```

### 생각한 것

1. 행렬의 곱을 먼저 제대로 이해하자. ([참고자료](https://mathbang.net/562#gsc.tab=0))
2. 최대 1000억번 제곱해야 하는데, 시간 제한은 1초다. $O(N)$의 시간복잡도로는 풀 수 없다.
3. 제곱 연산을 최적화하는 방법이 떠오르지 않아 답을 참고했다.
4. $C^n$ 은

   - 짝수일 때

     - $C^{n / 2} * C^{n / 2}$ 이다.

   - 홀수일 때
     - $C^{(n - 1) / 2} * C^{(n - 1) / 2} * C$이다.

5. 이 방법으로 연산하면 $C$의 $n$거듭제곱을 $log$ 시간 복잡도로 풀어낼 수 있다.

### 시간 복잡도

$O(logN)$

### 사용한 자료구조 / 알고리즘

- 분할정복

### 코멘트

- 거듭제곱 연산을 최적화하는 방법을 처음 알게 되었다. 이 방법을 정수의 거듭제곱 연산에도 활용할 수 있을 것으로 보인다.

### 난이도 / 걸린 시간

- 골드4 / 2시간 30분 (정답 참조)
