## 문제풀이 
[문제 링크](https://www.acmicpc.net/problem/10867)

---

### 문제 설명

오늘의 문제는 주어진 n 개의 수에서 중복값을 제거하고 오름차순 정렬하여 한줄로 출력하는 문제이다. n 의 범위는 최대 10만개로 주어졌고 각각의 수는 1000 보다 작거나 같은 수로 제한된다.

---

### 풀이 방식?

충분히 js 에서 주어지는 내장 정렬로도 해결이 가능한 문제이나 분할정복의 사용법이 익숙하지 않다고 생각해서 연습을 진행할겸 분할정복을 이용하여 문제를 해결하였다. 그리고 정렬에 앞서서 우선 중복값을 제거하기 위해서 $new Set()$ 을 먼저 사용하여 중복값을 제거한 배열을 만들어주고 분할정복을 이용하여 정렬을 진행했다.
최종 출력은 join(" ") 을 이용하여 띄어쓰기를 적용시켜 출력했다.

--- 

### 문제 코드

```js
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

function mergeSort(arr) {
    if (arr.length < 2) return arr;
    const half = Math.floor(arr.length / 2);
    const left = arr.slice(0, half);
    const right = arr.slice(half, arr.length);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    const result = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length) result.push(left.shift());
    while (right.length) result.push(right.shift());
    return result;
}

const arr = [...new Set(input[1].split(" ").map(Number))];

const sorted = mergeSort(arr);

// let answer = "";

// sorted.forEach(e => {
//     answer += `${e} `;
// });

// console.log(answer);
console.log(sorted.join(" "));
```

---

### 시간복잡도

분할정복의 시간복잡도는 $n log n$ 을 보장한다.