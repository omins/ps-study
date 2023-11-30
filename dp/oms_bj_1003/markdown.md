# 문제풀이

[문제링크](https://www.acmicpc.net/problem/1003)

난이도 : 실버 3

소요시간 : 1시간

## 문제설명

다음 소스는 N번째 피보나치 수를 구하는 C++ 함수이다.

```c++
int fibonacci(int n) {
    if (n == 0) {
        printf("0");
        return 0;
    } else if (n == 1) {
        printf("1");
        return 1;
    } else {
        return fibonacci(n‐1) + fibonacci(n‐2);
    }
}
```

fibonacci(3)을 호출하면 다음과 같은 일이 일어난다.

- fibonacci(3)은 fibonacci(2)와 fibonacci(1) (첫 번째 호출)을 호출한다.
- fibonacci(2)는 fibonacci(1) (두 번째 호출)과 fibonacci(0)을 호출한다.
- 두 번째 호출한 fibonacci(1)은 1을 출력하고 1을 리턴한다.
- fibonacci(0)은 0을 출력하고, 0을 리턴한다.
- fibonacci(2)는 fibonacci(1)과 fibonacci(0)의 결과를 얻고, 1을 리턴한다.
- 첫 번째 호출한 fibonacci(1)은 1을 출력하고, 1을 리턴한다.
- fibonacci(3)은 fibonacci(2)와 fibonacci(1)의 결과를 얻고, 2를 리턴한다.

1은 2번 출력되고, 0은 1번 출력된다. N이 주어졌을 때, fibonacci(N)을 호출했을 때, 0과 1이 각각 몇 번 출력되는지 구하는 프로그램을 작성하시오.

## 문제접근

### 1차 시도(시간 초과)

```js
let tc = Number(input.shift());

while (tc) {
  let zero = 0;
  let one = 0;
  const n = Number(input.shift());

  function fibo(x) {
    if (x === 0) {
      zero++;
      return 0;
    } else if (x === 1) {
      one++;
      return 1;
    } else {
      return fibo(x - 1) + fibo(x - 2);
    }
  }

  fibo(n);
  console.log(zero, one);
  tc--;
}
```

- input에서 테스트케이스를 분리한다.
- 테스트케이스 만큼 반복문을 실행한다.
  1. 0, 1이 호출되는 수를 기록할 변수를 생성한다.
  2. input에서 현재 테스트케이스의 n을 분리한다.
  3. 피보나치를 구하는 함수를 통해서 0, 1이 몇번씩 호출되는지 기록한다.
  4. 0, 1이 호출된 횟수를 출력한다.

#### 문제점

해당 문제는 0.25초로 시간 제한이 걸려있는 문제다. 따라서 중복되는 연산을 피하고 최대한 메모제이션을 활용해야 한다. 현제 방식에서는 매번 새로운 연산을 진행해야 한다. 즉 테스트케이스 마다 다시 피보나치를 계산해야한다.

### 2차 시도(통과)

메모제이션을 활용해서 미리 피보나치 수열을 계산해 저장하고 필요한 값을 호출하기만 한다.

```js
const tc = Number(input[0]);
const d = new Array(100).fill(0);
d[0] = 0;
d[1] = 1;

for (let i = 2; i <= 40; i++) {
  d[i] = d[i - 1] + d[i - 2];
}

for (let t = 1; t <= tc; t++) {
  const n = Number(input[t]);

  if (n === 0) {
    console.log(1, 0);
  } else {
    console.log(d[n - 1], d[n]);
  }
}
```

문제를 계속 살펴보다 보니 한 가지 규칙을 발견했다. n번째 피보나치 수열의 수를 계산할 때 1이 호출되는 횟수는 피보나치 수열의 n번째 이고 0이 호출되는 횟수는 n - 1번째 이다. 따라서 다음과 같이 풀이할 수 있었다.

- 피보나치 수열을 d 배열에 모두 저장한다.
- 테스트케이스만큼 반복한다.
  1. 만약 n이 0이면 1, 0을 출력한다.
  2. 만약 n이 0이 아니라면 d[n - 1], d[n]을 출력한다.

해당 문제는 간단한 규칙을 찾아내면 쉽게 해결이 가능한 문제였지만 dp의 숙련도 부족과 문제 자체를 너무 어렵게 접근하여 시간이 다소 오래걸렸다.
