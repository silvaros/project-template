define([
	'underscore',

	'./base'
],
function( _, baseConfig ){
 	return _.extend( baseConfig, { 
		assets: {
			css: ['app.css'	],
			js: ['app.js']
		},

		viewsPath:'./app/views'	
	});
});