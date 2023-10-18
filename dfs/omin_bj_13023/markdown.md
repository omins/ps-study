## 13023번 문제

[문제 링크](https://www.acmicpc.net/problem/13023)

### 생각한 것

1. 그래프에서 길이 4의 경로를 찾는 문제다.
2. 무방향 그래프이고, A -> B -> C -> D -> E 와 E -> D -> C -> B -> A 모두 참이다.
3. 첫 번째 노드부터 N-1 노드까지 각 노드에 깊이 우선 탐색을 적용하며 깊이가 5가 되면 경로가 있는 것이다.

### 시간 복잡도

$O(V + E)$

### 사용한 자료구조 / 알고리즘

인접 리스트 / DFS

### 코멘트

- 백트래킹에서 난항을 겪었다. 방문처리를 해제하느냐 안 하느냐에 따라 답이 바뀌었다.

```js
function dfs(start, step, visited) {
  if (step === 5) {
    return true;
  }

  for (const node of adj[start]) {
    if (!visited[node]) {
      visited[node] = true;
      if (dfs(node, step + 1, visited)) {
        return true;
      }
    }
  }

  return false;
}
```

```js
function dfs(start, step, visited) {
  if (step === 5) {
    return true;
  }

  for (const node of adj[start]) {
    if (!visited[node]) {
      visited[node] = true;
      if (dfs(node, step + 1, visited)) {
        return true;
      }
      visited[node] = false;
    }
  }

  return false;
}
```

### 난이도 / 걸린 시간

- 실버 골드5 / 2시간
