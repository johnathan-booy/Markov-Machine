const { inspectObject } = require("./inspectObject");
const { getRandomElement } = require("./helpers");

/** Textual markov chain generator */

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		// Get keys that start lines
		this.startKeys = this.getStartKeys(text);

		// Get all words
		this.words = this.splitWords(text);

		// Analyze Markov Chains
		this.chains = this.makeChains();
	}

	getStartKeys(text) {
		const startKeys = new Set();
		let lines = this.splitLines(text);
		for (const line of lines) {
			const words = this.splitWords(text);
			if (words.length > 1) {
				const key = this.makeKey(words[0], words[1]);
				startKeys.add(key);
			}
		}
		return Array.from(startKeys);
	}

	splitWords(text) {
		return text.split(/[ \r\n]+/).filter((c) => c !== "");
	}

	splitLines(text) {
		return text.split("\n").filter((line) => line !== "");
	}

	makeKey(w1, w2) {
		return w1 + " " + w2;
	}

	makeChains() {
		const chains = new Map();

		for (let i = 0; i < this.words.length - 1; i++) {
			const arr = this.words;
			const key = this.makeKey(arr[i], arr[i + 1]);
			const nextWord = arr[i + 2] || null;
			if (chains.get(key)) {
				chains.get(key).push(nextWord);
			} else {
				chains.set(key, [nextWord]);
			}
		}
		return chains;
	}

	/** return random text from chains */

	makeText(numWords = 100) {
		const allKeys = Array.from(this.chains.keys());
		let key = getRandomElement(this.startKeys);
		const out = [];
		while (key !== null && out.length < numWords) {
			let [w1, w2] = key.split(" ");
			out.push(w1);
			key = this.makeKey(w2, getRandomElement(this.chains.get(key)));
		}
		let text = out.join(" ");
		return this.endAtPeriod(text);
	}

	endAtPeriod(str) {
		return str.slice(0, str.lastIndexOf(".") + 1);
	}
}

module.exports = { MarkovMachine };
