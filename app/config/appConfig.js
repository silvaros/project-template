define([
	'globber'
],
function(globber){
	return {
		title: 'Gymme', 
		description: '',
		keywords: '',
		templateEngine: 'jade',

		assets: {
			css: [
				'public/css/app.css'	
			],
			js: [
				// libraries
				'public/lib/underscore/underscore-min.js',
				'public/lib/jquery/dist/jquery.min.js',

				'public/lib/backbone/backbone.js',
				'public/lib/knockout/dist/knockout.js',
				'public/lib/knockback/knockback.min.js',

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

		getJavaScriptAssets: function(jsFiles, includeTests) {
			var output = globber.get(jsFiles, 'public/');

			// To include tests
			// if (includeTests) {
			// 	output = _.union(output, globber.get(this.assets.tests));
			// }

			return output;
		},

		getCSSAssets: function(cssFiles) {
			var output = globber.get(cssFiles, 'public/');
			return output;
		}
	}
});