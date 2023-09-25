## 문제 풀이
[문제 링크](https://www.acmicpc.net/problem/1439)

### 접근방식

* 주어지는 숫자는 0,1 두가지 
* 이 숫자들을 뒤집어 모두 같은 숫자로 만들어야 한다.
* 최소한의 뒤집기로 모두 같은 수로 만드는 경우의 수를 찾아야 한다.
* 0, 1 각각의 수가 연속적으로 나오는 횟수가 몇번인지 파악한다.
* 둘중에 작은 횟수가 최소한의 뒤집기로 모든수를 같게 만드는 수가 된다.
>* 예) 1011011 라는 문자열이 주어졌을때 
>>* 1 은 1, 11, 11 이렇게 3번 등장
>>* 0 은 0, 0 이렇게 두번 등장
>>* 1을 뒤집을 경우 3번을 뒤집어야 하지만 0을 뒤집을 경우 2번만 뒤집으면 된다.

### 풀이코드
```js
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("");

let one = [];
let zero = [];
let sum = "";

for (let i = 0; i < input.length; i++) {
    if (input[i] === "1") {
        sum += input[i];
        if (input[i + 1] === "0" || input[i + 1] === undefined) {
            one.push(sum);
            sum = "";
        }
    } else {
        sum += input[i];
        if (input[i + 1] === "1" || input[i + 1] === undefined) {
            zero.push(sum);
            sum = "";
        }
    }
}

console.log(Math.min(one.length, zero.length));
```


### 시간복잡도

결국 모든 연속된 숫자를 파악하기 위해서는 문자열의 모든 원소를 한번씩 확인해야 하기에 
시간복잡도는 $O(N)$ 이라고 생각된다.

### 사용한 알고리즘

*Greedy Algorithm*

### 풀면서 느낀점

최종적인 해법은 금방 떠올렸지만 그 해법을 사용하기 위한 몇가지 조건들을 구현하는데 있어서 다소 어려움을 겪었다. 같은 알고리즘의 문제라고 하더라더 정말 많은 유형이 존재하기에 더 많은 문제를 접하고 해결하면서 나의 해결능력을 길러야겠다고 생각이 들었다.