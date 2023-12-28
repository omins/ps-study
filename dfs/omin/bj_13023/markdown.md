## 13023번 문제

[문제 링크](https://www.acmicpc.net/problem/13023)

### 생각한 것

1. 그래프에서 길이 4의 경로를 찾는 문제다.
2. 무방향 그래프이고, A -> B -> C -> D -> E 와 E -> D -> C -> B -> A 모두 참이다.
3. 첫 번째 노드부터 N-1 노드까지 각 노드에 깊이 우선 탐색을 적용하며 방문 노드의 수가 5가 되면 길이 4의 경로가 있는 것이다.

### 시간 복잡도

$O(V + E)$

### 사용한 자료구조 / 알고리즘

인접 리스트 / DFS(백트래킹)

### 코멘트

- **(중요) DFS는 모든 노드를 탐색할 수 있지만, 그래프에 순환 경로가 있는 경우 모든 경로의 경우의 수를 탐색하지 않는다.**
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

반례

```
5 5
3 1
3 2
3 4
1 0
1 2
```

반례에 따르면 인접 리스트는 아래와 같은 형태가 되고, 1과 2, 그리고 3 사이에 순환 경로가 생긴다.

이 반례의 최적의 해는 0 -> 1 -> 2 -> 3 -> 4 혹은 이 경로의 역인 4 -> 3 -> 2 -> 1 -> 0 밖에 없는데 처음 구현한 DFS에서는 인접 리스트의 첫 원소부터 순회하며 방문처리 하기 때문에, 1번 노드에서는 항상 3번 노드부터 방문하고, 3번 노드에서는 항상 1번 노드부터 방문하여 최적의 해를 찾을 수 없다.

따라서 하나의 노드에서 출발하여 모든 가능한 경로를 보기 위해서는 최적의 해가 아닌 경로에서는 방문처리를 해제해주어 다시 해당 노드를 방문할 수 있도록 해야 한다.

```json
{
  "0": [1],
  "1": [3, 0, 2],
  "2": [3, 1],
  "3": [1, 2, 4],
  "4": [3]
}
```

### 난이도 / 걸린 시간

- 골드5 / 2시간
