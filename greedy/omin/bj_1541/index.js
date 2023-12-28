const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const eq = fs.readFileSync(filepath).toString().trim();

const splitByminus = eq.split('-');

const sumResult = splitByminus.map(eq => {
  const splitByPlus = eq.split('+').map(num => Number(num));
  return splitByPlus.reduce((a, b) => a + b, 0);
});

let answer = sumResult[0];

for (let i = 1; i < sumResult.length; i++) {
  answer -= sumResult[i];
}

console.log(answer);
