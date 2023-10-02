const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [start, target] = fs
  .readFileSync(filepath)
  .toString()
  .trim()
  .split(' ')
  .map(el => Number(el));

bfs();

function bfs() {
  const queue = [];
  queue.push([start, 1]);

  while (queue.length) {
    const [number, turn] = queue.shift();
    const double = number * 2;
    const addOne = Number(number.toString().concat('1'));
    const currentTurn = turn + 1;

    if (double === target || addOne === target) {
      console.log(currentTurn);
      return;
    }

    if (double < target) {
      queue.push([double, currentTurn]);
    }

    if (addOne < target) {
      queue.push([addOne, currentTurn]);
    }
  }

  console.log(-1);
}
