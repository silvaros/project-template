'use strict';

define([
	'underscore',
	'globber'
],
function( _, globber){	
	return {
		getJavaScriptAssets: function(jsFiles, includeTests) {
			var output = globber.get(jsFiles);

			// To include tests
			if (includeTests) {
				output = _.union(output, globber.get(this.assets.tests));
			}


			output = output.map(function(file) {
				return file.replace('public', '');
			});
		
			return output;
		},

		getCSSAssets: function(cssFiles) {
			var output = globber.get(cssFiles);

			output = output.map(function(file) {
				return file.replace('public', '');
			});
			
			return output;
		}
	}
});