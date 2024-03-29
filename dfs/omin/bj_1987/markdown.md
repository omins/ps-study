## 1987번 문제

[문제 링크](https://www.acmicpc.net/problem/1987)

### 생각한 것

1. `(0, 0)` 지점에서 출발해 현재까지 방문하지 않은 지점 중, 현재까지 방문하지 않은 알파벳을 방문하는 최대 길이를 구하는 문제이다.
2. 같은 영역을 탐색하더라도 경로는 여러가지가 있을 수 있기 때문에 한 번 DFS를 통해 재귀적으로 탐색했다면 방문처리를 해재하여 다시 그 지점을 방문할 수 있도록 한다.
3. 알파벳은 항상 대문자로 주어진다. 같은 알파벳을 방문하지 않을 수 있으면서, 빠른 조회가 가능한 집합으로 지금까지 방문한 알파벳을 관리한다.

### 시간 복잡도

$O(NM)$

### 사용한 자료구조 / 알고리즘

DFS(백트래킹)

### 코멘트

- 완전 탐색하는 문제인지, 갈 수 있는 모든 경로를 봐야 하는지 잘 고려해서 알고리즘을 결정하는 것이 중요했다.

### 난이도 / 걸린 시간

- 골드4 / 1시간 20분
