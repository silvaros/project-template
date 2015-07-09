var requirejs = require('requirejs');

requirejs.config({
	baseUrl: '.',
	nodeRequire: require,
	waitSeconds: 0,

	// please keep in abc order
	paths: {
		'appInit': 'app/config/init/appInit',
		'config': 'app/config/env/base',
		'expressInit': 'app/config/init/expressInit',
		'globber': 'utils/globber'
});

module.exports = requirejs;
