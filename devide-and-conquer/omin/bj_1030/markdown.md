## 10830번 문제

[문제 링크](https://www.acmicpc.net/problem/10830)

### 풀이코드

```js
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [S, N, K, y1, y2, x1, x2] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const answer = [];
const width = Math.pow(N, S);

for (let y = y1; y <= y2; y++) {
  const row = [];

  for (let x = x1; x <= x2; x++) {
    const col = getColor(x, y, N, K, width);
    row.push(col);
  }

  answer.push(row);
}

printAnswer(answer);

function getColor(x, y, n, k, width) {
  if (width === 1) return 0;

  const prevWidth = Math.floor(width / n);
  const blackStart = Math.floor(((n - k) / 2) * prevWidth);

  if (isBlack(x, y, width, blackStart)) return 1;

  return getColor(x % prevWidth, y % prevWidth, n, k, prevWidth);
}

function isBlack(x, y, width, blackStart) {
  return (
    x >= blackStart &&
    x < width - blackStart &&
    y >= blackStart &&
    y < width - blackStart
  );
}

function printAnswer(answer) {
  console.log(answer.map(row => row.join('')).join('\n'));
}
```

### 생각한 것

1. 정사각형의 크기는 $N^s$이다. $N$은 최대 $8$, $s$는 최대 $10$으로 $8^{10}$. 즉 $2^{30}$이다. $O(N)$의 시간복잡도로 풀어낸다면 시간 초과가 되고, 전체 배열을 저장하면 메모리 초과가 된다. (원소 하나가 1바이트라고 가정해도 최소 1GB)
2. 처음에는 공간복잡도는 생각하지 못해서 배열을 $O(N)$ 이하의 시간복잡도로 구성하거나, 출력해야 하는 범위만 알아내야 한다고 가정하고 접근했다.
3. 결국 같은 패턴이 반복되는 것이기 때문에 배열의 중첩구조로 구성해 중복되는 연산을 줄일 수 있을까 생각했지만 메모리를 매우 비효율적으로 써야 했고
4. 출력해야 하는 범위만 알아내는 방법은 도저히 생각이 나지 않았다.
5. [정답](https://blue-jay.tistory.com/33)을 봤다. 해당 범위를 알아낼 수 있는 방법이 있었다. width, x, y, n, k 값을 이용하면 x,y의 값을 알아낼 수 있다.

### 시간 복잡도

범위 50이하에 대해 $O(N^2)$

### 사용한 자료구조 / 알고리즘

- 분할정복

### 코멘트

- 거듭제곱 연산을 최적화하는 방법을 처음 알게 되었다. 이 방법을 정수의 거듭제곱 연산에도 활용할 수 있을 것으로 보인다.

### 난이도 / 걸린 시간

- 골드3 / 1시간 30분 (정답 참조)

### 참고자료

- https://blue-jay.tistory.com/33
