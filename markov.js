const { inspectObject } = require("./inspectObject");
const { getRandomElement } = require("./helpers");

/** Textual markov chain generator */

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter((c) => c !== "");
		this.chains = this.makeChains();
	}

	makeChains() {
		const chains = new Map();
		this.words.forEach((word, idx, arr) => {
			const nextWord = arr[idx + 1] || null;
			if (chains.get(word)) {
				chains.get(word).push(nextWord);
			} else {
				chains.set(word, [nextWord]);
			}
		});
		return chains;
	}

	/** return random text from chains */

	makeText(numWords = 100) {
		let text = "";
		const allKeys = Array.from(this.chains.keys());
		let key = getRandomElement(allKeys);
		let options = this.chains.get(key);
		while (!options.includes(null)) {
			const word = getRandomElement(options);
			text += word;
			text += " ";
			key = word;
			options = this.chains.get(key);
		}
		return text;
	}
}

module.exports = { MarkovMachine };
