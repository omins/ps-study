const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [NM, ...villageRows] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');
const [_, M] = NM.trim()
  .split(' ')
  .map(el => Number(el));

const village = villageRows.map(row =>
  row
    .trim()
    .split(' ')
    .map(el => Number(el))
);

const [houses, shops] = getHousesAndShops(village);
const distances = getDistances(houses, shops);
const combinations = getCombinations(shops, M);

solution(combinations, distances);

function solution(combinations, distances) {
  let minSumHouseToShop = Infinity;

  combinations.forEach(combination => {
    const shopList = Array.isArray(combination) ? combination : [combination];
    let sumHouseToShop = 0;

    houses.forEach(house => {
      let minHouseToShop = Infinity;

      shopList.forEach(shop => {
        const houseToShop = distances[house][shop];
        minHouseToShop = Math.min(minHouseToShop, houseToShop);
      });

      sumHouseToShop += minHouseToShop;
    });

    minSumHouseToShop = Math.min(minSumHouseToShop, sumHouseToShop);
  });

  console.log(minSumHouseToShop);
}

function getHousesAndShops(village) {
  const houses = [];
  const shops = [];

  village.forEach((row, i) => {
    row.forEach((cell, j) => {
      const locationString = `${i} ${j}`;
      if (cell === 1) {
        houses.push(locationString);
      } else if (cell === 2) {
        shops.push(locationString);
      }
    });
  });

  return [houses, shops];
}

function getDistances(houses, shops) {
  const distances = {};

  houses.forEach(house => {
    const [houseRow, houseCol] = house.split(' ').map(Number);
    distances[house] = {};

    shops.forEach(shop => {
      const [shopRow, shopCol] = shop.split(' ').map(Number);
      const distance = getManhattanDistance(
        houseRow,
        shopRow,
        houseCol,
        shopCol
      );
      distances[house][shop] = distance;
    });
  });

  return distances;
}

function getCombinations(arr, r) {
  if (r === 1) return arr;

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

function getManhattanDistance(x1, x2, y1, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}
