const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';

const [NM, rest] = fs.readFileSync(filePath).toString().trim().split('\n');
const lectures = rest.split(' ').map(Number);
const [_, diskCount] = NM.split(' ').map(Number);
const MAX_SIZE = 1_000_000_000;

console.log(search(lectures, diskCount, MAX_SIZE));

function search(lectures, count, maxSize) {
  let start = 0;
  let end = maxSize;
  let optimalSize = 0;

  while (start <= end) {
    const size = Math.floor((start + end) / 2);

    if (isLectureRecodable(lectures, count, size)) {
      optimalSize = size;
      end = size - 1;
    } else {
      start = size + 1;
    }
  }

  return optimalSize;
}

function isLectureRecodable(lectures, count, size) {
  let idx = 0;

  for (let i = 0; i < count; i++) {
    let sum = 0;

    while (true) {
      if (idx === lectures.length) return true;
      if (sum + lectures[idx] > size) break;

      sum += lectures[idx];
      idx++;
    }
  }

  return false;
}
