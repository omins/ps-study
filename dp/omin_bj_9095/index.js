const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [_, ...rest] = fs.readFileSync(filePath).toString().trim().split('\n');
const testCases = rest.map(Number);

const answers = [];
const addNums = [1, 2, 3];

testCases.forEach(target => {
  const memo = {};
  const answer = dfs(target, 0, memo);
  answers.push(answer);
});

console.log(answers.join('\n'));

function dfs(target, sum, memo) {
  if (sum in memo) return memo[sum];
  if (sum === target) return 1;

  let currentSum = 0;

  addNums.forEach(addNum => {
    const nextSum = sum + addNum;
    if (nextSum <= target) {
      currentSum += dfs(target, nextSum, memo);
    }
  });

  memo[sum] = currentSum;
  return currentSum;
}
