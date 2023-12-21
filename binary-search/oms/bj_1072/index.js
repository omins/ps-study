const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs
  .readFileSync(filepath)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const x = input[0];
const y = input[1];
const z = Math.floor((y * 100) / x);
let start = 0;
let end = x;
let answer = 0;

if (z >= 99) {
  // 승률 99 -> 100은 불가능, 승률 100은 변경 불가능
  answer = -1;
} else {
  while (start <= end) {
    // mid => 추가로 게임을 진행한 횟수
    const mid = Math.floor((start + end) / 2);
    // 추가로 게임은 진행하고 구한 승률
    const curZ = Math.floor(((y + mid) * 100) / (x + mid));

    if (curZ === z) {
      // 승률이 변하지 않은 경우
      start = mid + 1;
    } else {
      // 승률이 높아진 경우 최소한의 게임 횟수를 구하기 위해서 end를 낮춰준다.
      end = mid - 1;
    }
  }
  answer = start;
}

console.log(answer);
