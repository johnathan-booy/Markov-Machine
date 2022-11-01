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
		const out = [];
		const allKeys = Array.from(this.chains.keys());
		let key = getRandomElement(allKeys);
		while (key !== null && out.length < numWords) {
			out.push(key);
			key = getRandomElement(this.chains.get(key));
		}
		return out.join(" ");
	}
}

module.exports = { MarkovMachine };
