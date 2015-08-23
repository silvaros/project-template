'use strict';

define(function(){
 	return { 
 		port: 3001,
		assets: {
			css: [ 'public/css/app.css'	],
			js: [
				// for things not loaded by require on the client
				'public/lib/requirejs/require.js',
				'public/config/requireInit.js',
				'public/config/appInit.js',

				// jquery before bootstrap
				'public/lib/jquery/dist/jquery.js',
				'public/bootstrap/dist/js/bootstrap.js'
			],
			tests: [
				'public/modules/*/tests/*.js'
			]
		},
		viewsPath: './app/views'
	}
});