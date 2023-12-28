const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = Number(fs.readFileSync(filePath).toString());

if (input % 2 === 0) {
  console.log('CY');
} else {
  console.log('SK');
}
