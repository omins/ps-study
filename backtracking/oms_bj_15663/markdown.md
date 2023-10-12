## 문제풀이
[문제링크](https://www.acmicpc.net/problem/15663)

문제 난이도: 실버 2

소요시간: 1시간 30분

### 문제설명
n개의 숫자를 m개씩 조합하여 만들 수 있는 순열을 모두 출력하라. n개의 숫자에는 중복된 숫자가 나올수 있으며
최종 순열을 출력할 때는 중복된 순열의 제외하고 출력해야한다.

### 문제접근
#### 1차시도 (메모리를 너무 많이 사용하고, 시간적으로도 약간의 손해를 봤다)

* 모든 순열을 구하고 하나의 변수에 할당한다.
* answer 변수를 Set 객체로 만들어 중복값을 포함하지 않게 만든다.
* 순열들을 하나씩 확인하며 answer 변수에 담아준다.

1. 순열을 구하면서 1번 반복문을 사용.
2. answer 변수에 하나씩 담으면서 반복문을 사용.
3. 순열을 담을 변수를 만들면서 메모리도 더 사용.

#### 1차 코드

```js
const [n, m] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number).sort((a, b) => a - b);

const answer = new Set();

const permutation = (arr, selectNum) => {
    const result = [];
    if (selectNum === 1) return arr.map((e) => [e]);

    arr.forEach((item, idx, origin) => {
        const remain = [...origin.slice(0, idx), ...origin.slice(idx + 1)];
        const recall = permutation(remain, selectNum - 1);
        const attach = recall.map((e) => [item, ...e]);

        result.push(...attach);
    });

    return result;
}

const per = permutation(nums, m);

for (let x of per) {
    answer.add(x.join(" "));
}

console.log([...answer].join("\n"));

```

#### 2차시도 (1차에서 부족한 부분을 조금 보완)

* 순열을 하나씩 구하면서 answer 에 담아준다. (Set 객체는 중복값을 허용하지 않기 때문에 하나의 값만 남게됨.)
1. 순열을 만드면서 중복된 원소가 사용되지 않게 방문처리 배열을 생성.
2. 현재 처리중인 원소로 만든 순열을 담아줄 selected 배열을 생성.
3. Set 으로 answer 변수를 생성.
4. 순열을 구하고 answer에 순열을 담아주는 역할을 할 backtracking 이라는 함수를 생성 (인자로 순열의 길이를 확인할 depth 를 받는다.) 
5. 숫자들을 하나씩 확인하며 방문여부를 체크하고 방문하지 않은 숫자는 selected 에 담아주고 방문처리
6. 재귀함수를 호출하며 depth + 1 을 진행.
7. 만약 depth 가 m과 같아졌다면 현재 순열을 확인하여 공백을 기준으로 나눠주고 answer에 추가한다.
8. 5~7 을 반복하며 모든 순열을 체크.
9. answer를 출력하면서 [...answer].join("\n") 을 이용해 원소들을 분해하여 배열로 바꿔주고 해당 원소들을 줄바꿈하여 출력한다.

#### 2차 코드

```js
const [n, m] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number).sort((a, b) => a - b);

const visited = new Array(n).fill(false);
const selected = [];
const answer = new Set();

const backtracking = (depth) => {
    if (depth === m) {
        answer.add(selected.join(" "));
    }
    for (let i = 0; i < n; i++) {
        if (visited[i]) continue;
        visited[i] = true;
        selected.push(nums[i]);
        backtracking(depth + 1);
        visited[i] = false;
        selected.pop();
    }
}
backtracking(0);
console.log([...answer].join("\n"));
```