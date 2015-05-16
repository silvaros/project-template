define([
	'globber',
	'underscore',
	'./' + process.env.NODE_ENV	//environment config only need development atm
],
function(globber, _, envConfig ){
	return _.extend({
		title: 'New Project Title', 
		description: '',
		keywords: '',
		templateEngine: 'jade',

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
	}, envConfig || {});
});
