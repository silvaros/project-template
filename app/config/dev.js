define([
],
function(globber, _ ){
 	return {
		assets: {
			css: [ 'public/css/app.css'	],
			js: [
				// libraries
				'public/lib/underscore/underscore.js',
				'public/lib/jquery/dist/jquery.js',

				'public/lib/backbone/backbone.js',
				'public/lib/knockout/dist/knockout.js',
				'public/lib/knockback/knockback.js',

				'public/lib/requirejs/require.js',

				// ours
				// require first
				'public/config/requireInit.js',
				'public/config/appInit.js'
			],
			tests: [
				'public/modules/*/tests/*.js'
			]
		},
		viewsPath: './app/views'
	}
});