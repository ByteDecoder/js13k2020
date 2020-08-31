var fs = require('fs');
var archiver = require('archiver');

const distDir = process.cwd() + '/dist';
const output = fs.createWriteStream(distDir + '/zipped/game.zip');
const archive = archiver('zip', { zlib: { level: 9 } });

// listen for all archive data to be written
// 'close' event is fired only when a file descriptor is involved
output.on('close', function () {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

// This event is fired when the data source is drained no matter what was the data source.
// It is not part of this library but rather from the NodeJS Stream API.
// @see: https://nodejs.org/api/stream.html#stream_event_end
output.on('end', function () {
  console.log('Data has been drained');
});

// good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on('warning', function (err) {
  if (err.code === 'ENOENT') {
    // log warning
  } else {
    // throw error
    throw err;
  }
});

// good practice to catch this error explicitly
archive.on('error', function (err) {
  throw err;
});

fs.readdir(distDir, function (err, files) {
  //handling error
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }

  archive.pipe(output);

  files.forEach(function (file) {
    if (file.includes('.')) {
      console.log(`Adding ${file} in the game zipfile`);
      archive.file(`${distDir}/${file}`, { name: file });
    }
  });

  archive.finalize();
});
