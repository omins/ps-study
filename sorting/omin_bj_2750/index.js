const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filepath).toString().trim().split('\n');

input.shift();
const arr = input.map(v => parseInt(v)).sort((a, b) => a - b);

arr.forEach(v => console.log(v));
