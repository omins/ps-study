## 2751번 문제

[문제 링크](https://www.acmicpc.net/problem/2751)

### 생각한 것

1. input은 최대 1,000,000이다. $n^2$의 시간복잡도로 푼다면 시간 초과가 된다.
2. 병합 정렬로 한 번 풀어보자. 병합 정렬 구현 연습도 하고, 병합 정렬은 시간 복잡도가 $O(N log N)$이기 때문에 가능하다.  
   ($1,000,000 * log_21,000,000) < 100,000,000$
3. 병합 정렬은 분할정복 방법을 차용한다.
   - a) 분할한다. b) 정복한다.c) 결합한다.
   - 더 이상 쪼갤 수 없을 때까지 배열을 쪼갠 다음, 작은 배열부터 정렬하면서 결합한다.
   - **종료 조건**: 1개 혹은 1개 이하의 원소를 가진 배열일 때.
   - **이유**: 한 개 혹은 1개 이하의 원소만 있으면 그 배열은 정렬되었다고 볼 수 있다.
4. 이 과정에서 핵심은 merge 함수이다. 쪼갠 배열을 정렬하면서 합쳐야 한다.

   ```js
   const merge = (left, right) => {
     const temp = [];
     let leftIdx = 0;
     let rightIdx = 0;

     while (leftIdx < left.length && rightIdx < right.length) {
       if (left[leftIdx] < right[rightIdx]) {
         temp.push(left[leftIdx]);
         leftIdx++;
       } else {
         temp.push(right[rightIdx]);
         rightIdx++;
       }
     }

     const result = temp.concat(left.slice(leftIdx), right.slice(rightIdx));
     return result;
   };
   ```

   - 왼, 오 각 배열의 첫번째 원소부터 비교한다. 이때 각 원소는 이미 이전 단계에서 정렬되었기 때문에 가장 첫번째 원소가 가장 작은 원소임을 보장한다.
   - 따라서 둘 중 하나의 배열의 모든 원소가 결과 배열에 삽입되었다면 다른 하나의 배열의 원소들은 모두 한 번에 결과 배열로 삽입해도 된다. 만약$A_0 < B_0$이 참이면, $A_0 < B_1$도 참이기 때문이다.

### 시간 복잡도

- $O(NlogN)$

### 사용한 자료구조 / 알고리즘

- 병합 정렬

### 코멘트

- 쪼개는 것보다 병합하는 방법을 더 잘 익혀야 할 것 같다.
