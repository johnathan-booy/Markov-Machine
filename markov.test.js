const { MarkovMachine } = require("./markov");

describe("makeText function", () => {
	let machine;
	beforeAll(() => {
		machine = new MarkovMachine(`the cat in the hat`);
	});
	test("should return keys", () => {
		const res = machine.makeText();
		console.log(machine.chains);
		// expect(machine.keys).toContain("ham.");
	});
});
