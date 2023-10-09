const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [N, ...rest] = fs.readFileSync(filepath).toString().trim().split('\n');

const powers = rest.map(line =>
  line
    .trim()
    .split(' ')
    .map(el => Number(el))
);

const members = getMembers();
const halfMember = Number(N) / 2;
const combinations = getCombinations(members, halfMember);

const center = Math.floor(combinations.length / 2);
const left = combinations.slice(0, center);
const right = combinations.slice(center).reverse();

solution();

function solution() {
  let min = Infinity;

  for (let i = 0; i < left.length; i++) {
    const teamLeft = left[i];
    const teamRight = right[i];

    let leftSum = 0;
    let rightSum = 0;

    for (let j = 0; j < teamLeft.length; j++) {
      for (let k = 0; k < teamLeft.length; k++) {
        if (j === k) continue;
        leftSum += powers[teamLeft[j]][teamLeft[k]];
        rightSum += powers[teamRight[j]][teamRight[k]];
      }
    }

    const diff = Math.abs(leftSum - rightSum);
    min = Math.min(diff, min);
  }

  console.log(min);
}

function getCombinations(arr, r) {
  if (r === 1) {
    return arr;
  }

  const result = [];

  for (let i = 0; i <= arr.length - r; i++) {
    const head = [arr[i]];
    const tail = getCombinations(arr.slice(i + 1), r - 1);

    for (let j = 0; j < tail.length; j++) {
      result.push(head.concat(tail[j]));
    }
  }

  return result;
}

function getMembers() {
  const arr = [];
  for (let i = 0; i < Number(N); i++) {
    arr.push(i);
  }

  return arr;
}
