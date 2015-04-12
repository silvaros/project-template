requirejs.config({
	baseUrl: "../",
	nodeRequire: require,
	waitSeconds: 0,

	// please keep in abc order
	paths: {
		"text" : "lib/requirejs-text/text",

		"knockout": "lib/knockout/dist/knockout",

		"globber": "../utils/globber"
	}
});
