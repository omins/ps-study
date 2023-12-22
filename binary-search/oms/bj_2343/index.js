const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const videos = input[1].split(" ").map(Number);
let start = Math.max(...videos); // 블루레이의 최소 길이는 비디오의 길이중 제일 긴 비디오의 길이
let end = videos.reduce((cur, acc) => cur + acc, 0); // 블루레이의 최대 길이는 모든 비디오의 길이를 합한 값
let answer = 1e9;

while (start <= end) {
  const mid = Math.floor((start + end) / 2);
  let count = 1;
  let cur = 0;

  for (let v of videos) {
    if (count > m) break; // 블루레이의 수가 이미 m을 넘었다면 계산을 그만한다.
    if (cur + v <= mid) {
      // 현재 블루레이에 남은 공간이 있다면 더해준다.
      cur += v;
    } else {
      // 블루레이에 남은 공간이 없다면 새로운 블루레이에 더해주고 count + 1을 한다.
      cur = v;
      count += 1;
    }
  }

  if (count <= m) {
    answer = mid;
    end = mid - 1;
  } else {
    start = mid + 1;
  }
}

console.log(answer);
