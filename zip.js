const readline = require("readline");
const zipIT = require('./zipIT')

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const askPath = () => {
	return new Promise((resolve) =>
		rl.question('Give me the path of the directory you want to zip: ', (path) => resolve(path)))
}

const askFileName = (path) => {
	return new Promise((resolve) => {
		rl.question('Give me the name of the output file name: ', (outputFilename) => { resolve([path, outputFilename]) })
	})
}

(async () => {
	let path = await askPath();
	let bundle = await askFileName(path);
	zipIT(
		...bundle,
		done => rl.close(),
		error => console.log(error))
})();
