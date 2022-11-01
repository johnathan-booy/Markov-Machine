const { pause } = require("pause-repl");
async function inspectObject(obj) {
	await pause(obj);
}

module.exports = { inspectObject };
