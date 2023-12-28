const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';

const [NM, ...rest] = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = NM.split(' ').map(Number);
const board = rest.map(line => line.trim().split(' ').map(Number));

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

let maxZeroCnt = 0;

const locations = getLocationsOfZero(board);
const adj = getAdjacents(locations);
const visited = getVisited(locations);
const combinations = getCombinations(adj, visited);

combinations.forEach(combination => {
  const tempBoard = JSON.parse(JSON.stringify(board));
  const locations = combination.split('|');

  locations.forEach(location => {
    [x, y] = location.split(',').map(Number);
    tempBoard[x][y] = 1;
  });

  const visitedBoard = Array.from({ length: N }, () =>
    Array.from({ length: M }).fill(false)
  );

  traverseBoard(tempBoard, visitedBoard);
  const zeroCnt = getZeroCnt(tempBoard);

  maxZeroCnt = Math.max(zeroCnt, maxZeroCnt);
});

console.log(maxZeroCnt);

function getLocationsOfZero(board) {
  const locations = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] !== 0) continue;
      locations.push(`${i},${j}`);
    }
  }
  return locations;
}

function getAdjacents(locations) {
  const adj = {};

  locations.forEach((location, idx, origin) => {
    adj[location] = origin.slice(idx + 1);
  });

  return adj;
}

function getVisited(locations) {
  const visited = {};
  locations.forEach(location => {
    visited[location] = false;
  });

  return visited;
}

function getCombinations(adj, visited) {
  const combinations = [];

  for (let node in adj) {
    dfs(node, 1, node, visited, adj, combinations);
  }

  return combinations;
}

function traverseBoard(board, visited) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] === 2 && !visited[i][j]) {
        bfs(i, j, visited, board);
      }
    }
  }
}

function getZeroCnt(board) {
  let cnt = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] === 0) {
        cnt++;
      }
    }
  }

  return cnt;
}

function dfs(location, step, path, visited, adj, combinations) {
  if (step === 3) {
    combinations.push(path);
    return;
  }

  visited[location] = true;

  adj[location].forEach(node => {
    if (!visited[node]) {
      const newPath = path.concat('|', node);
      dfs(node, step + 1, newPath, visited, adj, combinations);
    }
  });

  visited[location] = false;
}

function bfs(x, y, visited, board) {
  const queue = [];

  visited[x][y] = true;
  queue.push([x, y]);

  while (queue.length) {
    const [curX, curY] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nx = curX + dx[i];
      const ny = curY + dy[i];

      if (isGoodToGo(nx, ny, board, visited)) {
        visited[nx][ny] = true;
        board[nx][ny] = 2;
        queue.push([nx, ny]);
      }
    }
  }
}

function isGoodToGo(x, y, board, visited) {
  return (
    x >= 0 && x < N && y >= 0 && y < M && !visited[x][y] && board[x][y] === 0
  );
}
