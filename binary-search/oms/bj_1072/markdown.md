# 문제풀이

[문제링크](https://www.acmicpc.net/problem/1072)

난이도: 실버 3  
소요시간: 70분

## 문제설명

김형택은 지금 몰래 Spider Solitaire(스파이더 카드놀이)를 하고 있다. 형택이는 이 게임을 이길 때도 있었지만, 질 때도 있었다. 누군가의 시선이 느껴진 형택이는 게임을 중단하고 코딩을 하기 시작했다. 의심을 피했다고 생각한 형택이는 다시 게임을 켰다. 그 때 형택이는 잠시 코딩을 하는 사이에 자신의 게임 실력이 눈에 띄게 향상된 것을 알았다.

이제 형택이는 앞으로의 모든 게임에서 지지 않는다. 하지만, 형택이는 게임 기록을 삭제 할 수 없기 때문에, 자신의 못하던 예전 기록이 현재 자신의 엄청난 실력을 증명하지 못한다고 생각했다.

게임 기록은 다음과 같이 생겼다.

- 게임 횟수 : X
- 이긴 게임 : Y (Z%)
- Z는 형택이의 승률이고, 소수점은 버린다. 예를 들어, X=53, Y=47이라면, Z=88이다.

X와 Y가 주어졌을 때, 형택이가 게임을 최소 몇 번 더 해야 Z가 변하는지 구하는 프로그램을 작성하시오.

## 정답코드

```js
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
```

## 생각한 것

- 게임을 새로 진행하면 게임은 진행한 총횟수와 승리한 게임의 횟수가 달라진다.
- start, end를 이용해서 구한 mid가 새로 진행한 게임의 횟수가 된다.
- 새로운 게임을 진행하고 구한 승률이 변한다면 최소한의 게임 횟수로 승률을 올리기 위해서 end를 mid - 1로 변경한다.
- 승률이 변하지 않는다면 게임을 더 진행하기 위해 start를 mid + 1로 변경한다.
- 현재 승률이 99 이상이라면 더이상 승률은 변할 수 없다. (소수점을 제외한 숫자만 처리하기 때문)

승률을 구하는 과정에서 한가지 의문이 생겼다. 아래와 같이 승률을 구하는 공식에서 y에 먼저 100을 곱해주고 x를 나누는 경우와 y에서 x를 먼저 나누고 100을 곱하는 경우의 차이점을 아직 모르겠다.

```js
const z = Math.floor((y * 100) / x); // -> 정답
const z = Math.floor((y / x) * 100); // -> 오답
```
