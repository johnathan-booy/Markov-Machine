const { inspectObject } = require("./inspectObject");
const { getRandomElement } = require("./helpers");

/** Textual markov chain generator */

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		// Get keys that start lines
		const startKeys = new Set();
		let lines = text.split("\n");
		lines = lines.filter((line) => line !== "");
		for (const line of lines) {
			const words = line.split(/[ \r\n]+/);
			if (words.length > 1) {
				startKeys.add(`${words[0]} ${words[1]}`);
			}
		}
		this.startKeys = Array.from(startKeys);

		// Get all words
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter((c) => c !== "");

		// Analyze Markov Chains
		this.chains = this.makeChains();
	}

	makeChains() {
		const chains = new Map();

		for (let i = 0; i < this.words.length - 1; i++) {
			const arr = this.words;
			const bigram = `${arr[i]} ${arr[i + 1]}`;
			const nextWord = arr[i + 2] || null;
			if (chains.get(bigram)) {
				chains.get(bigram).push(nextWord);
			} else {
				chains.set(bigram, [nextWord]);
			}
		}
		return chains;
	}

	/** return random text from chains */

	makeText(numWords = 100) {
		const allKeys = Array.from(this.chains.keys());
		let key = getRandomElement(this.startKeys);
		console.log("Key:", key);
		const out = [];
		while (key !== null && out.length < numWords) {
			let [w1, w2] = key.split(" ");
			out.push(w1);
			key = `${w2} ${getRandomElement(this.chains.get(key))}`;
		}
		let text = out.join(" ");
		return this.endAtPeriod(text);
	}

	endAtPeriod(str) {
		return str.slice(0, str.lastIndexOf(".") + 1);
	}
}

module.exports = { MarkovMachine };
