const { MarkovMachine } = require("./markov");

describe("makeText function", () => {
	let machine;
	beforeAll(() => {
		machine = new MarkovMachine(`the cat in the hat is in the hat`);
	});
	test("should return keys", () => {
		console.log(machine.chains);
		machine.makeText();
		// expect(machine.keys).toContain("ham.");
	});
});
