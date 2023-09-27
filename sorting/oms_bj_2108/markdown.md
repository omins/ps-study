## 문제풀이
[문제 링크] (https://www.acmicpc.net/problem/2108)

### 문제 접근
1. 산술 평균
>* reduce 를 사용해 모든 값의 합을 구한다.
>* 합 나누기 n 을 이용하여 나누어주고 Math.round를 이용하여 소수점을 반올림하여 출력한다.
>* -0이 나오는 상황을 대비하여 조건문을 사용한다. (-0이 나올시 출력값을 0으로 고정)
2. 중앙값
>* js 정렬 메서드를 이용하여 배열을 오름차순으로 정렬한다.
>* Math.floor(배열의 길이 / 2) 를 이용하여 배열을 중앙 인덱스를 계산한다.
>* arr[중앙인덱스] 를 출력한다.
3. 최빈값
>* 배열에 나오는 수들의 빈도수를 확인하기 위해 객체를 만든다.
>* 반복문을 이용해 배열을 하나씩 확인하여 객체에 저장한다.
>>* 이미 등장한 숫자라면 value 값에 1을 더해주고
>>* 처음 등장한 숫자라면 value 값을 1로 설정한다.
>* 초기 최대 등장횟수를 1롤 지정한 변수와 그만큼 등장한 숫자를 저장할 배열을 선언한다.
>>* 반복문으로 객체를 하나씩 확인하며 만약 최대등장 변수보다 높은 값을 가지고 있는 수가 등장하면 최대등장횟수 변수를 업데이트하고 기존에 최대등장수에 해당하는 숫자들을 저장한 배열을 초기화 한다.
>>* 배열에 업데이트된 최대등장수에 해당하는 수를 저장한다.
>>* 만약 최대빈도수 배열의 길이가 1이상이라면 배열의 두번째 값을 출력하고 1이라면 해당 값을 출력한다.
4. 범위
>* 수 배열의 최대값 - 최소값을 출력한다.

### 문제를 풀면서 느낀점 혹은 어려웠던점

#### 어려웠던점
* 평균값 중앙값 범위를 계산하는 코드는 어렵지 않게 해결이 가능했다 하지만 최빈값을 구하는 코드를 구현할 때 아이디어는 생각이 났지만 이걸 구현하는 방법에 있어서 시간이 걸렸다. 처음에는 배열을 이용해서 풀어도 봤지만 해결이 되지 않았고 최종적으로 map 을 이용해서 해결하는데 성공했다.
#### 느낀점
* 처음 제출을 할 때 정렬을 병합정렬을 구현하여 제출 했지만 시간초과에 걸렸다. 최종적으로 내장 정렬을 이용해서 해결일 가능했다.
* 무조건 좋은 코드나 알고리즘을 사용하는게 항상 정답은 아니라는것을 느꼈다. 그 상황에 맞는 알고리즘을 사용하고 구현하는 연습이 더 필요한것 같다.

### 풀이 코드
```js
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");

const n = Number(input.shift());
const arr = input.map(Number);
// const sorted = mergeSort(arr); // 병합정렬 사용시 시간초과
const sorted = arr.sort((a, b) => a - b);

function average(arr, n) {
    let sum = arr.reduce((acc, cur) => acc + cur, 0);
    if (Math.round(sum / n) === -0) console.log(0);
    else console.log(Math.round(sum / n));
}

function center(arr) {
    console.log(arr[Math.floor(arr.length / 2)]);
}

function count(arr) {
    const map = new Map();
    for (let x of arr) {
        if (!map.has(x)) {
            map.set(x, 1);
        } else map.set(x, map.get(x) + 1);
    }
    let max = 1;
    let maxArr = [];
    map.forEach((e, k) => {
        if (max < e) {
            max = e;
            maxArr = [];
            maxArr.push(k);
        } else if (max === map.get(k)) maxArr.push(k);
    })
    return maxArr.length === 1 ? console.log(maxArr[0]) : console.log(maxArr[1]);
}

function range(arr) {
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    console.log(max - min);
}

average(sorted, n);
center(sorted);
count(sorted);
range(sorted);
```