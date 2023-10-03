## 문제풀이
[문제링크](https://www.acmicpc.net/problem/10162)

### 문제 요약
t 라는 숫자를 a(300), b(60), c(10) 세가지 수를 이용하여 0을 만들어야 하고 
a b c 세가지 숫자가 사용된 수를 최소한으로 사용하여야 한다.
세가지 숫자가 사용된 수를 공백을 기준으로 출력한다. 만약 0을 만들수 없다면 -1 을 출력한다.

### 문제 접근

* 최소한으로 수를 사용하기 위해서 뺄 수 있는 가장 큰수부터 이용하여 계산한다.
* 3가지 수의 cnt 배열을 만든다.
* 반복문을 이용하여 a b c 를 하나씩 확인하며 계산한다.
* 계산을 진행하며 cnt 배열에 각 수가 사용된 횟수를 기록한다. 
* t를 현재 계산 중인 수를 이용하여 가능한 만큼 빼준다.
* t의 최종값이 0 이라면 Cnt 배열을 join(" ") 이용하여 출력하고 아니라면 -1 을 출력한다.

### 문제 코드
```js
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n").map(Number);

let t = input[0];
const nums = [300, 60, 10];
const cnt = [0, 0, 0];

for (let i = 0; i < nums.length; i++) {
    if (nums[i] > t) continue;
    cnt[i] = Math.floor(t / nums[i]);
    t -= nums[i] * cnt[i];
}
if (t === 0) console.log(cnt.join(" "));
else console.log(-1);
```

### 풀이중 어려웠던 점?
처음 풀이를 할 때 초반에 조건문을 사용해 t가 짝수면 풀이를 진행하고 홀수라면 풀이를 진행하지 않고 -1 을 출력하게 했다.
하지만 이렇게 접근하면 오답이 나왔다 아마도 내가 찾지못한 반례가 존재하는 것 같다.