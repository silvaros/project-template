'use strict';

var requirejs = require('requirejs');

requirejs.config({
	baseUrl: '.',
	nodeRequire: require,
	waitSeconds: 0,

	// please keep in abc order
	paths: {
		'appInit': 'app/config/init/appInit',
		'config': 'app/config/env/base',
		'config-util': 'utils/file/config-util',
		'development-config': 'app/config/env/development',
		'expressInit': 'app/config/init/expressInit',
		'globber': 'utils/file/globber',
		'production-config': 'app/config/env/production'
	}
});

module.exports = requirejs;
