const archiver = require('archiver');
const fs = require('fs');

module.exports = zipIT = (path, outputFilename, done, error) => {
	let output = fs.createWriteStream(__dirname + `/${outputFilename}.zip`);
	var archive = archiver('zip', {
		store: true
	});

	output.on('close', () => {
		console.log(archive.pointer() + ' total bytes');
		console.log('archiver has been finalized and the output file descriptor has closed.');
	});

	archive.on('error', (err) => {
		error("Path not found");
		throw err;
	});
	archive.pipe(output);
	archive.directory(path);
	archive.finalize();
	done("done")
}