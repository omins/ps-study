const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [NC, ...rest] = fs.readFileSync(filePath).toString().trim().split('\n');
const [_, numRouter] = NC.split(' ').map(Number);
const houses = sort(rest.map(Number));
const MAX_DISTANCE = 1_000_000_000;

const answer = search({ houses, maxDistance: MAX_DISTANCE, numRouter });
console.log(answer);

function search({ houses, maxDistance, numRouter }) {
  let start = 1;
  let end = maxDistance;
  let answer = 1;

  while (start <= end) {
    const distance = Math.floor((start + end) / 2);

    if (isPortable({ houses, distance, maxDistance, numRouter })) {
      answer = distance;
      start = distance + 1;
    } else {
      end = distance - 1;
    }
  }

  return answer;
}

function isPortable({ houses, distance, maxDistance, numRouter }) {
  let prevHouse = -maxDistance;
  let portedCount = 0;

  for (let house of houses) {
    if (portedCount === numRouter) break;
    if (house - prevHouse < distance) continue;

    portedCount++;
    prevHouse = house;
  }

  return portedCount === numRouter;
}

function sort(arr) {
  if (arr.length <= 1) return arr;

  const center = Math.floor(arr.length / 2);
  const left = sort(arr.slice(0, center));
  const right = sort(arr.slice(center));

  return merge(left, right);
}

function merge(left, right) {
  const temp = [];
  let leftIdx = 0;
  let rightIdx = 0;

  while (leftIdx < left.length && rightIdx < right.length) {
    if (left[leftIdx] < right[rightIdx]) {
      temp.push(left[leftIdx++]);
    } else {
      temp.push(right[rightIdx++]);
    }
  }

  return temp.concat(left.slice(leftIdx), right.slice(rightIdx));
}
