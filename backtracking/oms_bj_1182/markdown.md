## 문제풀이
[문제링크](https://www.acmicpc.net/problem/1182)

문제 난이도: 실버 2

소요시간: 20분

### 문제설명
n 개의 수를 이용해서 합이 s 가 되는 수열의 수를 출력하라

### 문제접근
무조건 수열을 더하는 경우만 존재하기 때문에 순서가 상관없는 조합의 문제. => (-7 + -3) === (-3 + -7)

* 방문처리 배열과 현재 처리중인 조합을 담을 배열을 만든다.
* 문제를 처리할 backtracking 함수를 만들고 인자로는 start 를 받게한다.(start 를 이용해서 중복된 조합이 나오지 않게 처리한다.)
* 만약 조합 배열에 한개 이상의 원소가 있다면 해당 원소들의 합을 구해 s 와 비교한다. 
>* s 와 현재 처리중인 조합의 합이 같다면 cnt++ 를 진행한다.
* 조합 배열에 아직 원소가 없다면 n 개의 숫자가 들어있는 배열의 원소들을 하니씩 확인하며 아래와 같은 작업을 반복한다.
>* 만약 이미 방문처리 되어 있는 원소라면 다음 원소로 넘어간다.
>* 아직 방문처리 되지 않은 원소라면 방문처리를 진행하고 해당 원소를 조합 배열에 담아준다.
>* 함수를 재귀적으로 호출하여 모든 경우의 수를 확인한다.
>* 처리가 끝난 원소는 방문처리를 취소하고 조합 배열에서 제거한다.

### 문제코드

```js
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const [n, s] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number);

const visited = new Array(n).fill(false);
const selected = [];
let cnt = 0;

function backtracking(start) {
    if (selected.length > 0) {
        const result = [];
        for (let x of selected) result.push(x);
        const curNum = result.reduce((acc, cur) => acc + cur , 0);
        if (curNum === s) cnt++;
    }
    for (let i = start; i < n; i++) {
        if (visited[i]) continue;
        visited[i] = true;
        selected.push(nums[i]);
        backtracking(i + 1);
        visited[i] = false;
        selected.pop();
    }
}

backtracking(0);
console.log(cnt);
```