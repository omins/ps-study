const fs = require('fs');
const path = require('path');
const exclude = ['.git', 'backtracking', 'binary-search', 'devide-and-conquer'];

function fixDirectoryStructure(rootDir) {
  const files = fs.readdirSync(rootDir);

  files.forEach(file => {
    if (exclude.some(e => file === e)) return;

    const filePath = path.join(rootDir, file);
    const isDirectory = fs.statSync(filePath).isDirectory();

    if (!isDirectory) return;

    const pathOmin = path.join(filePath, 'omin');
    const pathOms = path.join(filePath, 'oms');

    if (!fs.existsSync(pathOmin) || !fs.existsSync(pathOms)) {
      fs.mkdir(pathOms, e => {});
      fs.mkdir(pathOmin, e => {});
    }

    const files = fs.readdirSync(filePath);

    const filesOmin = files.filter(file => file.includes('omin_bj'));
    const filesOms = files.filter(file => file.includes('oms_bj'));

    filesOmin.forEach(file => moveFiles(file, filePath));
    filesOms.forEach(file => moveFiles(file, filePath));
  });
}

function moveFiles(file, filePath) {
  const person = file.split('_')[0];
  const oldPath = path.join(filePath, file);
  const newPath = path.join(filePath, person, file.replace(`${person}_`, ''));
  console.log(oldPath, newPath);
  fs.renameSync(oldPath, newPath);
}

const rootDirectory = './';
fixDirectoryStructure(rootDirectory);
