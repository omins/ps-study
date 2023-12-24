## 문제풀이
[문제링크](https://www.acmicpc.net/problem/15657)

문제 난이도: 실버 3

소요시간: 1시간

### 문제설명
n개의 수를 m개씩 조합하여 만들수 있는 조합을 모두 출력하라. (수의 중복도 가능하다.)

### 문제접근
해당 문제는 조합을 구하는 문제이지만 한가지 수가 여러번 나와도 되는 중복조합에 해당한다.
아래처럼 약간의 변형으로 중복 조합을 찾을 수 있다.

```js
// 기존 조합 로직 일부
const remain = origin.slice(idx + 1); // 현재 처리중인 원소를 빼고 나머지 배열을 생성
const recall = getCombination(remain, selectNum - 1);
const attach = recall.map((e) => [item, ...e]);

// 중복 조합 로직 일부
const remain = origin.slice(idx); // 현재 처리중인 원소를 포함하고 나머지 배열을 생성
const recall = getCombination(remain, selectNum - 1);
const attach = recall.map((e) => [item, ...e]);
```

중복 조합을 모두 찾은 뒤에 각각의 조합들을 공백으로 나누어 정답에 담아주고 줄바꿈을 진행한다.

### 문제코드

```js
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number).sort((a, b) => a - b);
let answer = "";

const getCombination = (arr, selectNum) => {
    const result = [];
    if (selectNum === 1) return arr.map((e) => [e]);

    arr.forEach((item, idx, origin) => {
        const remain = origin.slice(idx);
        const recall = getCombination(remain, selectNum - 1);
        const attach = recall.map((e) => [item, ...e]);

        result.push(...attach);
    });
    return result;
}

const allComb = getCombination(nums, m);

allComb.map((e) => {
    answer += e.join(" ") + "\n";
});

console.log(answer);
```

### 풀면서 어려웠던 점, 느낀점
기존에 조합을 구하는 로직은 최근에 몇번 사용하면서 익숙해졌는데 여기서 약간의 변형이 들어간 중복조합을 구하는 아이디어를 
생각하는데 생각보다 오래 걸렸다. 아직 이해도가 조금 부족한거 같다.
최근 익숙한 유형이 나오면 문제를 해결하는 시간이 짧아지고 있지만 약간의 변형이 들어간 문제를 만나면 조금 버벅이는 느낌이다.
조금 더 다양한 유형의 문제를 풀면서 익숙해져야 겠다.