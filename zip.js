const zip = new require('node-zip');
const archiver = require('archiver');
const fs = require('fs');
const readline = require("readline");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const askPath = () => {
  return new Promise((resolve) => {
    rl.question('Give me the path of the directory you want to zip: ', (path) => { resolve(path) })
  })
}

const askFileName = (path) => {
  return new Promise((resolve) => {
    rl.question('Give me the name of the output file name: ', (outputFilename) => { resolve([path, outputFilename]) })
  })
}


const zipIT = (path, outputFilename, done, error) => {
	let output = fs.createWriteStream(__dirname + `/${outputFilename}.zip`);
	var archive = archiver('zip', {
		store: true
	});

	output.on('close', () => {
		console.log(archive.pointer() + ' total bytes');
		console.log('archiver has been finalized and the output file descriptor has closed.');
	});

	archive.on('error', (err) => {
		error(err);
		throw err;
	});

	archive.pipe(output);
	archive.directory(path);
	archive.finalize();
	done("done")
	rl.close();
}

askPath().then(askFileName).then(res => zipIT(...res, done => console.log(done), error => console.log(error)));

