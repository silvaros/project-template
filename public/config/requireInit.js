requirejs.config({
	baseUrl: "../",
	nodeRequire: require,
	waitSeconds: 0,

	// please keep in abc order
	paths: {
		"backbone": "lib/backbone/backbone",
		"globber": "../utils/globber",
		"jquery": "lib/jquery/dist/jquery",
		"knockout": "lib/knockout/dist/knockout",
		"knockback": "lib/knockback/knockback",
		"text": "lib/requirejs-text/text",
		"underscore": "lib/underscore/underscore"
	}
});
