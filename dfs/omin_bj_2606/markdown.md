## 2606번 문제

[문제 링크](https://www.acmicpc.net/problem/2606)

### 생각한 것

1. 노드의 갯수 V만큼 인접 리스트와 방문 배열을 초기화 한다.
2. 1번 컴퓨터부터 깊이 우선 탐색으로 인접한 모든 컴퓨터를 탐색하며 그 갯수를 파악한다.

### 시간 복잡도

$O(V + E)$

### 사용한 자료구조 / 알고리즘

인접 리스트 / DFS

### 코멘트

- 반례를 한 번 생각해봐야 한다.

### 난이도 / 걸린 시간

- 실버 3 / 30분