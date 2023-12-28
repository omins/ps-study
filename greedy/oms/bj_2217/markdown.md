## 문제풀이
[문제링크](https://www.acmicpc.net/problem/2217)

문제 난이도: 실버4

소요시간 : 15분

### 문제설명
* 첫 줄에 로프의 수 n이 주어지고 다음 줄 부터 n개의 줄 만큼 로프가 버틸 수 있는 최대 중량이 주어진다.
* 로프를 병렬로 연결하여 버틸 수 있는 최대 중량을 구하라.
* 모든 로프를 사용할 필요는 없다.

### 문제접근
* 최대 무게를 나타내는 변수 max를 0으로 선언한다.
* 로프줄 배열을 오름차순으로 정렬한다.
* for문을 이용해 n - i * 현재 value 를 max 변수와 비교하여 최대값을 갱신한다.
* 최종으로 max 값을 출력한다.

### 문제코드
```js
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n").map(Number);

const n = Number(input.shift());
let max = 0;

input.sort((a, b) => a - b);

for (let i = 0; i < n; i++) {
    max = Math.max(max, (input[i] * (n - i)));
}
console.log(max);
```