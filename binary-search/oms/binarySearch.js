// 재귀 함수로 구현

function binary(arr, t, s, e) {
  if (s > e) return -1;

  const m = parseInt((s + e) / 2);

  if (arr[m] === t) return m;
  else if (arr[m] > t) return binary(arr, t, s, m - 1);
  else return binary(arr, t, m + 1, e);
}

// 반복문으로 구현

function binary2(arr, t, s, e) {
  while (s <= e) {
    const m = parseInt((s + e) / 2);

    if (arr[m] === t) return m;
    else if (arr[m] > t) e = m - 1;
    else s = m + 1;
  }

  return -1;
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const t = 7;

console.log(binary(arr, t, 0, arr.length));
console.log(binary2(arr, t, 0, arr.length));

// 특정 범위의 하한선 구하는 함수

function lowerBound(arr, t, s, e) {
  while (s < e) {
    const m = parseInt((s + e) / 2);

    if (arr[m] >= t) e = m;
    else s = m + 1;
  }
  return e;
}

// 특정 범위의 상한선 구하는 함수

function upperBound(arr, t, s, e) {
  while (s < e) {
    const m = parseInt((s + e) / 2);

    if (arr[m] > t) e = m;
    else s = m + 1;
  }
  return e;
}

const arr2 = [3, 4, 5, 5, 5, 7, 9];
const t2 = 5;

console.log(lowerBound(arr2, t2, 0, arr2.length));
console.log(upperBound(arr2, t2, 0, arr2.length));

// 특정 범위에 해당하는 원소의 개수를 구하는 함수

function countByRange(arr, leftValue, rightValue) {
  const rightIndex = upperBound(arr, rightValue, 0, arr.length);
  const leftIndex = lowerBound(arr, leftValue, 0, arr.length);

  return rightIndex - leftIndex;
}

const arr3 = [1, 2, 3, 3, 3, 3, 4, 4, 8, 9];

console.log(countByRange(arr3, -1, 3));
console.log(countByRange(arr3, 4, 4));
