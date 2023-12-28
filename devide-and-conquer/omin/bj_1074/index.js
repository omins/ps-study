const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [N, y, x] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

console.log(solution(N, x, y));

function solution(N, x, y) {
  let start = 0;
  const length = Math.pow(2, N);

  let xStart, xEnd, yStart, yEnd;
  xStart = yStart = 0;
  xEnd = yEnd = length - 1;

  while (true) {
    if (isTarget(xStart, xEnd, yStart, yEnd, x, y)) return start;

    const quadrantInfo = getQuadrantInfo(xStart, xEnd, yStart, yEnd, x, y);
    const { index } = quadrantInfo;
    ({ xStart, xEnd, yStart, yEnd } = quadrantInfo);

    const area = Math.pow(xEnd - xStart + 1, 2);
    start += index * area;
  }
}

function getQuadrantInfo(xStart, xEnd, yStart, yEnd, xTarget, yTarget) {
  const xCenter = getCenter(xStart, xEnd);
  const yCenter = getCenter(yStart, yEnd);

  let nxStart = xStart;
  let nxEnd = xEnd;
  let nyStart = yStart;
  let nyEnd = yEnd;
  let index = 0;

  if (xTarget < xCenter && yTarget < yCenter) {
    index = 0;
    nxEnd = xCenter - 1;
    nyEnd = yCenter - 1;
  } else if (xTarget >= xCenter && yTarget < yCenter) {
    index = 1;
    nxStart = xCenter;
    nyEnd = yCenter - 1;
  } else if (xTarget < xCenter && yTarget >= yCenter) {
    index = 2;
    nxEnd = xCenter - 1;
    nyStart = yCenter;
  } else if (xTarget >= xCenter && yTarget >= yCenter) {
    index = 3;
    nxStart = xCenter;
    nyStart = yCenter;
  }

  return {
    xStart: nxStart,
    xEnd: nxEnd,
    yStart: nyStart,
    yEnd: nyEnd,
    index,
  };
}

function getCenter(start, end) {
  return Math.floor((start + end + 1) / 2);
}

function isTarget(xStart, xEnd, yStart, yEnd, x, y) {
  return xStart === x && xEnd === x && yStart === y && yEnd === y;
}
