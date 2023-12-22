# 문제풀이

[문제링크](https://www.acmicpc.net/problem/2343)

난이도: 실버 1

소요시간: 50분

## 문제설명

강토는 자신의 기타 강의 동영상을 블루레이로 만들어 판매하려고 한다. 블루레이에는 총 N개의 강의가 들어가는데, 블루레이를 녹화할 때, 강의의 순서가 바뀌면 안 된다. 순서가 뒤바뀌는 경우에는 강의의 흐름이 끊겨, 학생들이 대혼란에 빠질 수 있기 때문이다. 즉, i번 강의와 j번 강의를 같은 블루레이에 녹화하려면 i와 j 사이의 모든 강의도 같은 블루레이에 녹화해야 한다.

강토는 이 블루레이가 얼마나 팔릴지 아직 알 수 없기 때문에, 블루레이의 개수를 가급적 줄이려고 한다. 오랜 고민 끝에 강토는 M개의 블루레이에 모든 기타 강의 동영상을 녹화하기로 했다. 이때, 블루레이의 크기(녹화 가능한 길이)를 최소로 하려고 한다. 단, M개의 블루레이는 모두 같은 크기이어야 한다.

강토의 각 강의의 길이가 분 단위(자연수)로 주어진다. 이때, 가능한 블루레이의 크기 중 최소를 구하는 프로그램을 작성하시오.

## 정답코드

```js
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
```

## 생각한 것

- 블루레이의 길이는 단조증가의 형태로 이분탐색을 사용할 수 있다.
- 블루레이의 최대 길이는 모든 비디오 길이의 합이다.
- 블루레이의 최소 길이는 모든 비디오 중에서 제일 큰 비디오의 값이어야 한다.
- mid를 블루레이의 길이로 가정하고 계산을 진행한다.
  - count 는 1로 cur은 0으로 초기화한다.
  - 비디오들을 순회하면서 cur + 비디오의 값이 mid보다 작거나 같다면 cur에 비디오를 더해준다.
  - cur + 비디오의 값이 mid보다 크다면 count를 더해주고 cur의 값을 비디오로 초기화한다.
  - count의 값이 m보다 커졌다면 계산을 중단한다.
- count의 값이 m보다 작거나 같다면 answer를 mid로 변경해주고 최소한의 길이를 구하기 위해 end를 mid - 1로 변경한다.
- count의 값이 m보다 크다면 start를 mid + 1로 변경한다.
