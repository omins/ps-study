## 문제풀이
[문제링크](https://www.acmicpc.net/problem/5568)

문제유형 : 백트래킹

문제 난이도 : 실버 4

소요시간 : 1시간

### 문제설명
n개의 카드를 k개만큼 붙혀서 만들 수 있는 숫자의 수를 출력하라

### 문제접근
* n, k , cards 를 input 에서 분리한다.
* selected, visited 배열을 만든다.
* nums 라는 객체를 만들어 만들 수 있는 조합의 수의 중복값 없이 담을 수 있게 준비한다.
* 백트래킹 함수를 만들고 인자로는 arr, depth 를 받는다.
>* depth 를 받는 이유는 k개의 수를 조합하기 위함.
* 배열을 돌면서 카드를 하나씩 확인한다.
>* 만약 확인한 카드면 넘어간다.
>* 아직 확인하지 않은 카드라면 방문처리하고 selected 배열에 담아준다.
>* 다시 재귀함수 호출
>* 확인이 끝난 카드는 selected 배열에서 제거하고 방문처리 취소한다.
* 만약 depth 가 k 와 동일하다면 선택한 카드를 조합하고 nums 객체에 전달한다.
* 모든 카드 조합의 확인이 완료되면 nums 의 사이즈를 출력한다.

### 풀이코드
```js
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const n = Number(input[0]);
const k = Number(input[1]);
const cards = [];
for (let i = 2; i <= n + 1; i++) cards.push(Number(input[i]));
const nums = new Set();
const visited = new Array(n).fill(false);
const selected = [];

function backTracking(arr, depth) {
    if (depth === k) {
        const result = [];
        for (let x of selected) result.push(x);
        const num = result.join("");
        nums.add(Number(num));
    }
    for (let i = 0; i < arr.length; i++) {
        if (visited[i]) continue;
        visited[i] = true;
        selected.push(arr[i]);
        backTracking(arr, depth + 1);
        visited[i] = false;
        selected.pop();
    }
}

backTracking(cards, 0);

console.log(nums.size);
```

### 풀면서 어려웠던점
문제를 보면서 단순히 조합문제라고 생각하고 풀이를 진행했다. 하지만 계속 오답이 나와서 당황했다.
몇번씩 문제를 확인하며 놓친부분에 대해서 생각해보니 해당 문제가 조합 문제이긴 하지만 결과에 대해서 중복인지를 확인할 뿐
사용했던 카드를 다시 사용하면 안되는 문제는 아니다. 따라서 함수의 로직은 순열과 비슷하게 가져가지만 set 을 이용해 최종적인 
결과에 대해서 중복값을 제거하면 해결이 가능했다.