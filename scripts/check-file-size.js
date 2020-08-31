const fs = require('fs');
const chalk = require('chalk');

const MAX_BYTES = 13312;
const filename = './dist/zipped/game.zip';

function getFilesizeInBytes(filenameParam) {
  return fs.statSync(filenameParam).size;
}

function fileIsUnderMaxSize(fileSizeParam) {
  return fileSizeParam <= MAX_BYTES;
}

const fileSize = getFilesizeInBytes(filename);
const fileSizeDifference = Math.abs(MAX_BYTES - fileSize);

if (fileIsUnderMaxSize(fileSize)) {
  console.log(
    chalk.green(
      `Hooray! The file is ${fileSize} bytes (${fileSizeDifference} bytes under the limit).`
    )
  );
  process.exit(0);
} else {
  console.log(
    chalk.red(`Nuts! The file is ${fileSize} bytes (${fileSizeDifference} bytes over the limit).`)
  );
  process.exit(1);
}
