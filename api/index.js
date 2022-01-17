const { createRequestHandler } = require("@remix-run/vercel");

const build = require("./_build");

module.exports = createRequestHandler({
  build,
});
