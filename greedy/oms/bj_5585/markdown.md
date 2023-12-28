## 문제풀이
[문제링크](https://www.acmicpc.net/problem/5585)

난이도 : 브론즈 2

소요시간 : 약 15분

### 어떻게 풀었나?
* 최소한으로 거스름돈을 돌려주기 위해서 줄 수 있는 가장 큰 돈부터 거슬러 준다.

### 문제코드
```js
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const price = Number(input[0]);
const coins = [500, 100, 50, 10, 5, 1];
let pay = 1000;
let cnt = 0;

let changes = pay - price;

for (let coin of coins) {
    if (coin > changes) continue;
    cnt += Math.floor(changes / coin);
    changes -= Math.floor(changes / coin) * coin;
}

console.log(cnt);
```

### 문제를 풀면서 느낀점
전날 더 쉬운 난이도의 문제를 생각보다 오래걸려서 해결했다. 그래서 오늘도 어제보단 어렵지만 그렇게 어렵지 않은 난이도를 골라
그리디에 대해서 조금 더 이해하는 시간을 가지려고 했다. 어제보다 이해도가 올라갔다는 생각이 들었고 다음 풀이부터는 더 난이도를 올려서 깊게 생각하는 연습을 해봐야겠다.