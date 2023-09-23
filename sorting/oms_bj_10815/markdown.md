## 문제풀이
[문제 링크](https://www.acmicpc.net/problem/10815)

---

### 풀이 방식

1. 처음 풀이 방식 (시간초과) : 이분탐색 $O(logN)$
 * 먼저 분할정복을 이용해서 상근이가 가지고 있는 카드들을 오름차순으로 정렬한다. **(상근이의 카드는 중복이 없다.)**
 * 이분탐색으로 상근이가 카드를 가지고 있다면 1을 없다면 0을 정답에 담아준다.

위 방식으로 문제를 풀었을 때 시간초과를 받았다. 최악의 경우 2500억의 연산을 진행해야 하는데 위 문제는 2억번의 연산안에 답을 내야한다.
 
 ---

 2. 최종풀이 (통과) : set.has() 을 이용한 풀이 $O(1)$
 * 상근이가 가지고 있는 카드들을 set 을 이용하여 변환한다.
 * set.has 를 이용하여서 상근이가 문제 카드를 가지고 있는지 여부를 판단한다.

 ---
 ### 최종코드

```js
const nArr = new Set(input[1].split(" ").map(Number));
const mArr = input[3].split(" ").map(Number);
const answer = [];

mArr.forEach(m => {
    if (nArr.has(m)) answer.push(1);
    else answer.push(0);
});
console.log(answer.join(" "));
```