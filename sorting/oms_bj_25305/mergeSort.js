function mergeSort(array) {
  if (array.length < 2) return array; // 원소가 하나만 남았다면 그대로 리턴.
  let half = Math.floor(array.length / 2); //배열의 중간지점을 정의.
  let left = array.slice(0, half); //반으로 나눈 배열의 왼쪽.
  let right = array.slice(half, array.length); //반으로 나눈 배열의 오른쪽.
  return merge(mergeSort(left), mergeSort(right)); // 재귀적으로 쪼개고 합친다.
}

function merge(left, right) {
    let result = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) { // 반으로 나눈 배열의 첫 원소를 비교한다.
            result.push(left.shift()); // 더 작은 수를 결과 배열에 담아준다.
        } else {
            result.push(right.shift()); // 더 작은 수를 결과 배열에 담아준다.
        }
    }
    while (left.length) result.push(left.shift()); // 한쪽에 남은 원소가 있다면 결과 배열에 담아준다.
    while (right.length) result.push(right.shift());
    return result;
}

answer = mergeSort([7,5,2,3,9,11,10,1,4]);
console.log(answer);