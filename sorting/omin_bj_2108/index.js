const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filepath).toString().trim().split('\n');

const arr = input.slice(1).map(el => Number(el));

const sort = arr => {
  if (arr.length <= 1) return arr;

  const center = getCenterIdx(arr);
  const left = sort(arr.slice(0, center));
  const right = sort(arr.slice(center));

  return merge(left, right);
};

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

const getMedian = arr => {
  const center = getCenterIdx(arr);
  return arr[center];
};

const getCenterIdx = arr => {
  return Math.floor(arr.length / 2);
};

const getAverage = arr => {
  // 오답
  // const sum = arr.reduce((a, b) => a + b, 0);
  // const avgAtFirstDigit = Number((sum / arr.length).toFixed(1));
  // const avg = Math.round(avgAtFirstDigit);

  // toFixed는 해당 자릿수보다 숫자가 이어지면 반올림을 하고, 부족하면 0을 채운다.
  // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed#%EC%84%A4%EB%AA%85
  // console.log((0.456).toFixed(1)); // 0.5
  // console.log(Math.round((0.456).toFixed(1))); // 1

  // 정답
  const sum = arr.reduce((a, b) => a + b, 0);
  const avg = Math.round(sum / arr.length);

  return avg === 0 ? 0 : avg;
};

const getMode = arr => {
  const map = new Map();

  for (let i = 0; i < arr.length; i++) {
    if (map.has(arr[i])) {
      map.set(arr[i], map.get(arr[i]) + 1);
    } else {
      map.set(arr[i], 1);
    }
  }

  let max = -Infinity;
  const set = new Set();

  for (let [key, value] of map) {
    if (value > max) {
      set.clear();
      set.add(key);
      max = value;
    } else if (value === max) {
      set.add(key);
    }
  }

  const temp = Array.from(set);

  if (temp.length > 1) {
    const sortedArr = sort(temp);
    return sortedArr[1];
  } else {
    return temp[0];
  }
};

const getRange = arr => {
  const max = Math.max(...arr);
  const min = Math.min(...arr);

  return max - min;
};

const sortedArr = sort(arr);

console.log(getAverage(sortedArr));
console.log(getMedian(sortedArr));
console.log(getMode(sortedArr));
console.log(getRange(sortedArr));
