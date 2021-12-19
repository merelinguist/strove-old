const { createRequestHandler } = require("@remix-run/vercel");

// eslint-disable-next-line import/no-unresolved
const build = require("./_build");

module.exports = createRequestHandler({
	build,
});
