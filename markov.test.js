const { MarkovMachine } = require("./markov");
const fs = require("fs");

describe("makeText function", () => {
	let machine;
	let text;

	beforeEach(() => {
		machine = new MarkovMachine(
			`The old man and the sea. The old whale and the man? The old tale and the whale. The old hag and the bag who made a bid for freedom. The old plastic world. The old way never dies.`
		);
		text = machine.makeText();
	});
	test("should start with sentence beginnings", () => {
		expect(text.substring(0, 7)).toEqual("The old");
	});
	test("should end with a period, question mark, or exclamation point", () => {
		expect(".!?").toContain(text[text.length - 1]);
	});
	test("should create unique results", () => {
		const text2 = machine.makeText();
		expect(text).not.toEqual(text2);
	});
});
