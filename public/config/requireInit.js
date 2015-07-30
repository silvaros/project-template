requirejs.config({
	baseUrl: "../",
	nodeRequire: require,
	waitSeconds: 0,

	paths: {
		"backbone": "lib/backbone/backbone",
		"globber": "../utils/globber",
		"jquery": "lib/jquery/dist/jquery",
		"knockout": "lib/knockout/dist/knockout",
		"knockback": "lib/knockback/knockback",
		"template": "config/template",
		"text": "lib/requirejs-text/text",
		"underscore": "lib/underscore/underscore"
	}
});
