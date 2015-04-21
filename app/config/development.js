define(function(){
 	return { 
		assets: {
			css: [ 'public/css/app.css'	],
			js: [
				// for things not loaded by require on the client
				'public/lib/requirejs/require.js',
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