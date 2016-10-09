requirejs.config({
	baseUrl: ".",
	nodeRequire: require,
	waitSeconds: 0,

	paths: {
		"backbone": "lib/backbone/backbone",
		"bbr": "lib/backbone-relational/backbone-relational",
		"bbv": "lib/backbone-validation/dist/backbone-validation-amd",
		"jquery": "lib/jquery/dist/jquery",
		"knockout": "lib/knockout/dist/knockout.debug",
		"knockback": "lib/knockback/knockback",
		"text": "lib/requirejs-text/text",
		"template": "config/template",
		"underscore": "lib/underscore/underscore",

		"socket-client": "lib/socket.io-client/socket.io"
	}
});
