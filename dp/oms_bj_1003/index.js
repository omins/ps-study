const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n");
// let tc = Number(input.shift());

// while (tc) {
//   let zero = 0;
//   let one = 0;
//   const n = Number(input.shift());

//   function fibo(x) {
//     if (x === 0) {
//       zero++;
//       return 0;
//     } else if (x === 1) {
//       one++;
//       return 1;
//     } else {
//       return fibo(x - 1) + fibo(x - 2);
//     }
//   }

//   fibo(n);
//   console.log(zero, one);
//   tc--;
// }

const tc = Number(input[0]);
const d = new Array(100).fill(0);
d[0] = 0;
d[1] = 1;

for (let i = 2; i <= 40; i++) {
  d[i] = d[i - 1] + d[i - 2];
}

for (let t = 1; t <= tc; t++) {
  const n = Number(input[t]);

  if (n === 0) {
    console.log(1, 0);
  } else {
    console.log(d[n - 1], d[n]);
  }
}
