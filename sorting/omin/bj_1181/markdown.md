## 1181번 문제

[문제 링크](https://www.acmicpc.net/problem/1181)

### 생각한 것

1. 기존 수 정렬 문제와 달리 문자열의 정렬이며, 두 가지 정렬 조건이 있었다.
   1. 짧은 단어가 더 먼저.
   2. 길이가 같다면 사전순으로.
2. 그리고 중복된 단어는 없어야 한다.
3. 중복된 단어를 정렬 이전에 없애는 것, 두 문자열을 비교하는 로직이 추가된다는 것을 제외하고는 수를 정렬하는 기본적인 문제와 풀이 방법이 동일하다.
4. 조건이 두 가지로 늘어났기 때문에 두 문자열을 비교하는 함수를 별도로 만들어서 비교하고 이 외 모든 부분에서 수를 정렬하는 것과 같은 로직으로 정렬한다.
5. 수이던 문자열이던 "둘 중 어느 것이 더 크냐"를 알아내는 것이 핵심이기 때문.
6. 알고리즘은 병합정렬을 활용해본다.

### 시간 복잡도

$O(NlogN)$

### 사용한 자료구조 / 알고리즘

Set, 병합 정렬

### 코멘트

- 비교하는 로직을 별도 함수로 분리하니 디버깅 할 때 다른 부분이 아닌 비교하는 로직만을 들여다 볼 수 있었다.