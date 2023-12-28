# 풀이 해설
Click [백준 링크](https://www.acmicpc.net/problem/1026)
- a 배열과 b 배열을 모두 정렬을 진행한다. 이때 하나는 오름차순 하나는 내림차순으로 정렬한다.

- 큰수와 큰수를 곱하면 최대값을 나타내게 되니 최대한 큰수와 작은수를 곱할수 있게 해준다.

- 정렬을 마무리 했다면 sum 이라는 변수를 만들어 a 배열과 b 배열의 같은 인덱스끼리 곱하여 sum 에 더해준다.

```js
const n = Number(input[0]);
const a = [];
const b = [];

for (let i = 0; i < n; i++) {
    a.push(input[1].split(" ").map(Number)[i]);
    b.push(input[2].split(" ").map(Number)[i]);
}

a.sort((a, b) => a - b);
b.sort((a, b) => b - a);
let sum = 0;

for (let i = 0; i < n; i++) {
    sum += a[i] * b[i];
}

console.log(sum);
```