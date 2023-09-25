## 1920번 문제

[문제 링크](https://www.acmicpc.net/problem/2108)

### 생각한 것

1. 중앙값을 구하기 위해 우선 정렬한다.
2. 산술평균은 수를 모두 더한 뒤 Length로 나누어주기
3. 중앙값은 정렬된 배열의 중간 원소
4. 최빈값은 Map을 통해 각각 등장한 횟수를 저장하고, 이 중에서 가장 큰 것을 골라 배열에 담는다. 최빈값이 한 개면 그대로 출력하고, 한 개 이상이면 1번째 원소를 출력한다.
5. 범위는 최댓값에서 최솟값을 빼준다.

### 시간 복잡도

$O(NlogN)$

### 사용한 자료구조 / 알고리즘

Map, Set / 병합 정렬

### 코멘트

- 숫자 연산에서 여러 번 병목이 있었음.

  - 막힌 부분: **소수점 반올림, 숫자 0과 -0이 같이 취급되는 것.**
  - `Number.prototype.toFixed()`는 해당 자릿수보다 숫자가 이어지면 반올림을 하고, 부족하면 0을 채운다. 따라서 `toFixed()`를 호출하고, `Math.round()`를 한 번 더 호출하면 반올림을 두 번 하는 꼴이다. [(링크)](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed#%EC%84%A4%EB%AA%85)

  ```js
  console.log((0.456).toFixed(1)); // 0.5
  console.log(Math.round((0.456).toFixed(1))); // 1
  ```
