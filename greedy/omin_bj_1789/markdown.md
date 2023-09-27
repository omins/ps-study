## 1789번 문제

[문제 링크](https://www.acmicpc.net/problem/1789)

### 생각한 것

1. 인풋이 42억이다. $O(log N)$시간 복잡도로 풀거나, 공식을 찾아 그 공식을 적용해서 풀어야 한다.
2. 최대한 많이 더해서 $S$를 만들어야 한다.
3. 최대한 많이 더하려면: 작은 수 부터 더해야 한다.
4. 1부터 $N$까지의 합을 구하는 방법을 적용할 수 없을까?
5. $N(N+1)/2 <= S$까지는 확인했으나, 그 역으로 N을 구하는 방법은 떠올리지 못함.
6. 1부터 시작했을 때 N은 $N+1$번 반복되는 패턴이 있다.
7. 찾아보니 생각보다 더 간단한 해결 방법이었다.

   - 작은 수부터 더하는 접근법은 맞았다.
   - 하지만 생각 못했던 부분은 더하는 수에 1씩 더해도 O(N)보다 빠르게 해결할 수 있다는 것이다.
   - 1, 3, 6, 10, 15, 21, 28, ... 순서로 증가하기 때문에 더 단순히 반복문으로 해결해도 $O(N)$이하의 시간 복잡도로 풀 수 있다.

     ```js
     let answer = 0;
     let N = 0;

     while (answer < S) {
       N++;
       answer += N;
     }

     if (answer > S) {
       N--;
     }

     console.log(N);
     ```

   - answer가 S와 같거나 작을 때까지만 $N$에 1씩 더하면서 answer에 더해주고, 종료 조건이 되었을 때 answer가 S보다 크면 N에서 1만 빼주면 된다 (1단계). 이전 단계에서 합한 숫자를 S로 만들어 줄 수 있는 숫자를 대입하면 된다.

### 시간 복잡도

$O(N)$ 이하

### 사용한 자료구조 / 알고리즘

그리디

### 코멘트

- 정말 쉬운 방법부터 생각해보면 좋을 것 같다.