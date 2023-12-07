const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [NM, rest] = fs.readFileSync(filePath).toString().trim().split('\n');
const trees = rest.split(' ').map(Number);

const [_, target] = NM.split(' ').map(Number);
const MAX_HEIGHT = 1_000_000_000;

const answer = search(trees, MAX_HEIGHT, target);
console.log(answer);

function search(trees, max, target) {
  let start = 0;
  let end = max;
  let answer = 0;

  while (start <= end) {
    const height = Math.round((start + end) / 2);
    const cutResult = getCutTrees(trees, height);

    if (cutResult >= target) {
      answer = height;
      start = height + 1;
    } else {
      end = height - 1;
    }
  }

  return answer;
}

function getCutTrees(trees, height) {
  return trees.reduce(
    (acc, cur) => acc + (cur - height > 0 ? cur - height : 0),
    0
  );
}
