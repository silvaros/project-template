'use strict';

define([
	'body-parser', 'express', 'path',
	'config', 'config-util', 'globber'
],
function(bodyParser, express, path, config, configUtil, globber){
	process.env.PORT = config.port || 3001;

	var app = express();

	app.locals.description = config.description;
	app.locals.keywords = config.keywords;
	app.locals.title = config.title;

	// files the layout html should include
	app.locals.cssFiles = configUtil.getCSSAssets( config.assets.css );
	app.locals.jsFiles = configUtil.getJavaScriptAssets( config.assets.js );

	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	
	// Setting the app router and static folder
	app.use(express.static(path.resolve('./public')));

	// server side templating 
	app.engine('html', require('consolidate')[config.templateEngine]);
	app.set('view engine', 'html');
	app.set('views', config.viewsPath);	

	// register routes
	var files = globber.get('./app/routes/**/*.js');
	files.forEach(function(route) {
		require(path.resolve(route))(app);
	});

	// this should always be the last route for a single page app.
	app.route('/*').get(function(req, res) {
	    res.render('index');
	});

	return app;	
});