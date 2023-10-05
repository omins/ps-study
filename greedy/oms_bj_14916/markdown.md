## 문제풀이
[문제링크](https://www.acmicpc.net/problem/14916)

* 난이도 : 실버5 
* 소요시간 : 20분

### 문제설명
고객이 상품을 구매하고 남은 거스름돈을 5원, 2원 두가지 동전을 이용해서 거슬러 줘야 한다. 이때 최소한의 동전으로 거슬러 준다.

* 사용한 동전의 수를 출력한다.
* 만약 거슬러줄 수 없는 금액이면 -1 을 출력한다.

### 문제 접근

* 무작정 5원을 이용하여 거슬러 주면 나중에 2원을 이용해서 거슬러 주지 못하는 상황이 생길 수 있다.
* 5원을 이용해서 모두 거슬러 줄 수 있는 상황이라면 5원 부터 사용한다.
>* 하지만 ```거스름돈 % 5 !== 0``` 인 상황이라면? 
>* 2원을 이용해서 빼주면서 ```거스름돈 % 5 === 0``` 인 상황이 될 때 까지 반복한다. (빼기를 진행할 때 마다 cnt + 1)
>* 5원을 이용해서 0을 만들 수 있는 상황이 만들어지면 거스름돈 / 5 를 cnt 에 더해준다.
* 거스름돈이 3원 혹은 1원인 경우에는 돈을 거슬러 줄 수 없으니 -1 을 출력한다.

### 문제 코드
```js
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

let changes = Number(input[0]);
let cnt = 0;
while (changes > 0) {
    if (changes === 1 || changes === 3) {
        cnt = -1;
        break;
    } 
    if (changes % 5 !== 0) {
        changes -= 2;
        cnt++;
    } 
    else if (changes % 5 === 0) {
        let c = Math.floor(changes / 5);
        changes -= c * 5;
        cnt += c;
    }
}

console.log(cnt);
```