var _ = require('lodash'),
	glob = require('glob'),
	path = require('path');

function getGlobbedFiles(globPatterns, removeRoot) {
	// For context switching
	var _this = this;

	// URL paths regex
	var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

	// The output array
	var output = [];

	// If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob 
	if (_.isArray(globPatterns)) {
		globPatterns.forEach(function(globPattern) {
			output = _.union(output, getGlobbedFiles(globPattern, removeRoot));
		});
	} else if (_.isString(globPatterns)) {
		if (urlRegex.test(globPatterns)) {
			output.push(globPatterns);
		} else {
			output = _.union(output, glob( globPatterns, { sync : true } ));
		}
	}

	if (removeRoot) {
		output = output.map(function(file) {
			return file.replace(removeRoot, '');
		});
	}

	return output;
};

function getJavaScriptAssets(jsFiles, includeTests) {
	var output = getGlobbedFiles(jsFiles, 'public/');

	// To include tests
	if (includeTests) {
		output = _.union(output, getGlobbedFiles(this.assets.tests));
	}

	return output;
};

function getCSSAssets(cssFiles) {
	var output = getGlobbedFiles(cssFiles, 'public/');
	return output;
};

module.exports = {
	title: 'Gymme', 
	description: '',
	keywords: '',
	templateEngine: 'jade',

	assets: {
		css: [
			// libraries
			'public/lib/bootstrap/dist/css/bootstrap.css',
			'public/lib/bootstrap/dist/css/bootstrap-theme.css',


			// ours
			'public/modules/**/css/*.css',
			'public/css/app.css'	
		],
		js: [
			// libraries
			'public/lib/underscore/underscore-min.js',
			'public/lib/jquery/dist/jquery.min.js',

			'public/lib/backbone/backbone.js',
			'public/lib/knockout/dist/knockout.js',
			'public/lib/knockback/knockback.min.js',
			

			// ours
			'public/appInit.js'
		],
		tests: [
			'public/modules/*/tests/*.js'
		]
	},

	initializeApplication: function(app){
		this.initExpress(app);
		this.initRoutes(app);	
	},

	initExpress: function(app){
		app.locals.description = this.description;
		app.locals.keywords = this.keywords;
		app.locals.title = this.title;

		// files the layout html should include
		app.locals.cssFiles = getCSSAssets( this.assets.css );
		app.locals.jsFiles = getJavaScriptAssets( this.assets.js );
	
		// server side templating 
		app.engine('html', require('consolidate')[this.templateEngine]);
		app.set('view engine', 'html');
		app.set('views', __dirname + './../views');
	},

	initRoutes: function(app){
		// Initialize strategies
		var files = getGlobbedFiles('./app/routes/*.js');
		files.forEach(function(route) {
			require(path.resolve(route))(app);
		});		
	}
}