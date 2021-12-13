const { createRequestHandler } = require("@remix-run/vercel");
const build = require("./build");

module.exports = createRequestHandler({
	build,
});
