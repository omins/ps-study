## 1926번 문제

[문제 링크](https://www.acmicpc.net/problem/1926)

### 생각한 것

1. 2차원 배열을 순회하면서 방문하지 않은 원소에 대해 깊이 우선 탐색 혹은 너비 우선 탐색을 수행한다.
2. 한 번 탐색을 할 때마다 그림은 하나다.
3. 탐색할 때 방문할 수 있는 그림을 만날 때마다 그림의 넓이를 1씩 더해준다.

### 시간 복잡도

$O(N^2)$

### 사용한 자료구조 / 알고리즘

행렬 / DFS

### 코멘트

- `Array.from()` 메소드 호출에서 난항을 겪었다.

아래 두 코드는 완전히 다른 결과를 초래한다. 첫번째 코드는 `Array.from({ length: row }).fill(false)`에서 반환된 객체의 참조로 `Array.from({ length: col }).fill(...)`을 채우기 때문에 한 배열의 원소를 조작하면 모든 inner array의 원소를 조작하는 것이 된다. 이를 방지하기 위해 두 번째 코드처럼 map 함수를 이용해 배열을 초기화 해주어야 한다.

```js
const visited = Array.from({ length: col }).fill(
  Array.from({ length: row }).fill(false)
);
```

```js
const visited = Array.from({ length: col }, () =>
  Array.from({ length: row }).fill(false)
);
```

추가로, `Array.from({length: 5})`는 길의 5의 undefined가 채워진 배열을 반환한다.

### 난이도 / 걸린 시간

- 실버 3 / 30분
