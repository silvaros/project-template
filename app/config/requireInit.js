var requirejs = require('requirejs');

requirejs.config({
	baseUrl: './app/',
	nodeRequire: require,
	waitSeconds: 0,

	// please keep in abc order
	paths: {
		'codeGen': 'utils/codeGenerator',
		'globber': 'utils/globber'

	}
});

module.exports = requirejs;
