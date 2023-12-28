# 문제풀이

[문제 링크](https://www.acmicpc.net/problem/2587)

## 접근방법?

해당 문제는 항상 다섯가지 수만 주어진다. 따라서 굳이 분할정복 같은 알고리즘을 사용할 필요없이 js 에서 주어지는 정렬기능을 이용하여 문제를 풀어도 시간초과 없이 해결이 가능하다.

* 평균갑을 구하기 위해 모든 수를 더한 값을 나타낼 sum 이라는 변수를 생성하고 값은 input 에 reduce 를 사용하여 모든 수를 더해준다.
* 평균값을 나타낼 변수를 생성하고 sum / 5 를 값으로 정의한다.
* 최종 출력값은 모든 수를 더한 값에 평균과 배열을 정렬했을 때 3번째 위치에 오는 값을 출력해야 한다. console.log 를 이용하여 값을 출력한다.

```js
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input =  fs.readFileSync(filepath).toString().trim().split("\n").map(Number);

let sum = input.reduce((acc, cur) => acc + cur, 0);
let avg = sum / 5;

const sorted = input.sort((a, b) => a - b);

console.log(avg);
console.log(sorted[2]);
```

### 시간복잡도?

js 의 내장 정렬을 사용하면 $(N log N)$ 의 시간 복잡도를 보장한다. (크롬 브라우저 기준) 

---

**merge 와 insertion 을 합쳐서 만든 timsort 를 사용한다.**