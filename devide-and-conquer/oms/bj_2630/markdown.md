# 문제풀이

[문제링크](https://www.acmicpc.net/problem/2630)

난이도: 실버 2 / 소요시간: 70분

## 정답코드

```js
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

let [n, ...paper] = input;
n = Number(n);
paper = paper.map((e) => e.split(" ").map((i) => Number(i)));

function solution(n, paper) {
  let white = 0;
  let blue = 0;
  function divide(x, y, length) {
    let temp = 0; // 파란색칸 개수
    for (let i = x; i < x + length; i++) {
      for (let j = y; j < y + length; j++) {
        if (paper[i][j]) {
          // 파란색칸 이라면
          temp += 1;
        }
      }
    }

    if (!temp) {
      // 하얀색 정사각형이라면
      white += 1;
    } else if (temp === length * length) {
      // 파란색 정사각형이라면
      blue += 1;
    } else {
      // 색이 동일한 정사각형을 찾지 못한 경우 4분할로 검사를 진행
      divide(x, y, length / 2); // 왼쪽 위
      divide(x, y + length / 2, length / 2); // 오른쪽 위
      divide(x + length / 2, y, length / 2); // 왼쪽 아래
      divide(x + length / 2, y + length / 2, length / 2); // 오른쪽 아래
    }
  }

  divide(0, 0, n);
  console.log(white);
  console.log(blue);
}

solution(n, paper);
```

**n \* n 의 정사각형이 주어질 때 같은색으로만 이루어진 정사각형의 수를 구하라**

1. x좌표, y좌표, 현재 정사각형의 크기 n을 기준으로 검사를 시작한다
2. 정사각형을 검사하면서 파란색 구역의 수를 계산한다.
3. 파란색 구역의 수가 0이라면 하얀색 정사각형이므로 white에 += 1을 해준다.
4. 파란색 구역의 수가 정사각형의 크기와 같다면 파란색 정사각형이므로 blue에 += 1을 해준다.
5. 정사각형이 모두 같은색이 아니라면 정사각형을 4분할로 나누어 1~4번 과정을 반복한다.
6. 하얀색 정사각형의 수, 파란색 정사각형의 수를 차례로 출력한다.
