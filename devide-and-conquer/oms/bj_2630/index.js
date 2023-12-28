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
