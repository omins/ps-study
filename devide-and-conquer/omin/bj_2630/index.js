const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [N, ...rest] = fs.readFileSync(filePath).toString().trim().split('\n');

const board = rest.map(line => line.split(' ').map(Number));

const [whiteCount, blueCount] = getPaperCount({
  board,
  xStart: 0,
  xEnd: N - 1,
  yStart: 0,
  yEnd: N - 1,
});

console.log(whiteCount);
console.log(blueCount);

/**
 * return [whiteCount, blueCount]
 */
function getPaperCount({ board, xStart, xEnd, yStart, yEnd }) {
  if (isSameColor({ board, xStart, xEnd, yStart, yEnd })) {
    return board[xStart][yStart] === 0 ? [1, 0] : [0, 1];
  }

  const xCenter = Math.floor((xStart + xEnd) / 2);
  const yCenter = Math.floor((yStart + yEnd) / 2);

  const first = getPaperCount({
    board,
    xStart,
    xEnd: xCenter,
    yStart,
    yEnd: yCenter,
  });

  const second = getPaperCount({
    board,
    xStart: xCenter + 1,
    xEnd,
    yStart,
    yEnd: yCenter,
  });

  const third = getPaperCount({
    board,
    xStart,
    xEnd: xCenter,
    yStart: yCenter + 1,
    yEnd,
  });

  const fourth = getPaperCount({
    board,
    xStart: xCenter + 1,
    xEnd,
    yStart: yCenter + 1,
    yEnd,
  });

  return getTotalPaperCount([].concat(first, second, third, fourth));
}

function isSameColor({ board, xStart, xEnd, yStart, yEnd }) {
  let color = board[xStart][yStart];

  for (let i = xStart; i <= xEnd; i++) {
    for (let j = yStart; j <= yEnd; j++) {
      if (board[i][j] !== color) return false;
    }
  }

  return true;
}

function getTotalPaperCount(sumArr) {
  let whiteCount = 0;
  let blueCount = 0;

  sumArr.forEach((elem, idx) => {
    if (idx % 2 === 0) {
      whiteCount += elem;
    } else {
      blueCount += elem;
    }
  });

  return [whiteCount, blueCount];
}
