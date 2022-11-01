/** Command-line tool to generate Markov text. */

const fs = require("fs");
const { argv } = require("process");
const { MarkovMachine } = require("./markov");
const axios = require("axios");

const type = argv[2];
const path = argv[3];

if (type !== "file" && type !== "url") {
	console.log(`Resource type "${type}" is not supported!`);
	process.kill(1);
}

if (type === "file") {
	readLocalFile(path);
}

if (type === "url") {
	readWebFile(path);
}

function readLocalFile(path) {
	fs.readFile(path, "utf8", (error, text) => {
		if (error) {
			console.log(`Error reading "${path}"!`, error);
			process.kill(1);
		}
		const machine = new MarkovMachine(text);
		console.log(machine.makeText());
	});
}

async function readWebFile(url) {
	try {
		const res = await axios.get(url);
		const machine = new MarkovMachine(res.data);
		console.log(machine.makeText());
	} catch (error) {
		console.log(`Error fetching "${url}`, error);
		process.kill(1);
	}
}
