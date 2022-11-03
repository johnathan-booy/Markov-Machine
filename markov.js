const { getRandomElement } = require("./helpers");

/** Textual markov chain generator */

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		// Get all words
		this.words = this.splitWords(text);

		// Analyze Markov Chains
		this.chains = this.makeChains();

		// Get keys that start lines
		this.startKeys = this.getStartKeys();
	}

	getStartKeys() {
		const firstKey = this.makeKey(this.words[0], this.words[1]);
		const startKeys = [firstKey];

		// Also include words that follow punctuation
		for (let i = 0; i < this.words.length - 2; i++) {
			const word = this.words[i];
			const nextKey = this.makeKey(this.words[i + 1], this.words[i + 2]);
			const marks = "?!.";
			for (let mark of marks) {
				if (word.includes(mark)) startKeys.push(nextKey);
			}
		}
		return startKeys;
	}

	splitWords(text) {
		return text.split(/[ \r\n]+/).filter((c) => c !== "");
	}

	splitLines(text) {
		return text.split(/\r?\n/).filter((line) => line !== "");
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

	makeText(numWords = 100, endAtPunctuation = true) {
		const allKeys = Array.from(this.chains.keys());
		let key = getRandomElement(this.startKeys);
		const out = [];
		while (key !== null && out.length < numWords) {
			const [w1, w2] = key.split(" ");
			const w3 = getRandomElement(this.chains.get(key));
			key = w3 !== null ? this.makeKey(w2, w3) : null;
			out.push(w1);
		}
		let text = out.join(" ");
		if ((endAtPunctuation = true)) return this.endAtPunctuation(text);
		return text;
	}

	endAtPunctuation(str) {
		if (str.includes(".")) {
			return str.slice(0, str.lastIndexOf(".") + 1);
		} else if (str.includes("!")) {
			return str.slice(0, str.lastIndexOf("!") + 1);
		} else if (str.includes("?")) {
			return str.slice(0, str.lastIndexOf("?") + 1);
		}
		return str;
	}
}

module.exports = { MarkovMachine };
