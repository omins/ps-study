## 문제풀이
[문제링크](https://www.acmicpc.net/problem/1715)

난이도 : 골드 4

소요시간 : 2시간 30분

### 문제 접근

#### 오답 접근법
* 현재 누적값을 배열의 첫번째 원소로 선언한다.
* 누적값들을 모아줄 배열을 만든다.
* 만약 주어진 카드 묶음이 하나라면 바로 출력한다.
* 배열을 돌면서 현재 값과 누적값을 더해주고 누적값 배열에 담아준다.
* 누적값을 갱신한다.
* 누적값 배열의 전체 합을 출력한다.
--- 
```js
let acc = input[0];
const arr = [];

if (input.length === 1) console.log(input[0]);
else {
    for (let i = 1; i < n; i++) {
        arr.push(acc + input[i]);
        acc += input[i];
    }
    console.log(arr.reduce((cur, acc) => cur + acc, 0));
}
```

#### 정답 접근법
* 힙을 만들어 배열의 모든 수를 담아준다.
* 누적값을 나타내는 변수를 선언하고 0으로 초기화한다.
* 힙의 길이가 1이상이면 계속 반복한다.
>* 가장 작은 두개의 값을 꺼내 더해준다. (현재합)
>* 누적값 변수에 더한다.
>* 현재합을 다시 힙에 담아준다.
* 최종 누적값을 출력한다.

```js
const minHeap = new Heap();

for (let x of input) minHeap.insert(x);

let answer = 0;

while (minHeap.getLenth() > 1) {
    let a = minHeap.remove();
    let b = minHeap.remove();
    let cur = a + b;
    answer += cur;
    minHeap.insert(cur);
}

console.log(answer);
```

### 오답사유
문제에서 주어진 예시만을 생각하며 문제를 풀다보니 제일 중요한 포인트를 놓치고 있었다.
그것은 항상 제일 작은 두값을 더하면서 해결해 나가야 최소값을 구할 수 있는데.
예시만 생각하다 보니 그 점을 놓치게 되었다. 그래서 최종적으로는 힙을 이용해 가장 작은 두값을 항상 찾아 더해주며 
문제를 해결할 수 있었다.