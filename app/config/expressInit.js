// loaded by index.js -> appInit.js
define([
	'body-parser', 'express', './appConfig'
],
function(bodyParser, express, appConfig){
	var app = express();

	app.locals.description = appConfig.description;
	app.locals.keywords = appConfig.keywords;
	app.locals.title = appConfig.title;

	// files the layout html should include
	app.locals.cssFiles = appConfig.getCSSAssets( appConfig.assets.css );
	app.locals.jsFiles = appConfig.getJavaScriptAssets( appConfig.assets.js );

	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	
	// Setting the app router and static folder
	app.use(express.static(require('path').resolve('./public')));

	// server side templating 
	app.engine('html', require('consolidate')[appConfig.templateEngine]);
	app.set('view engine', 'jade');
	app.set('views', './app/views');	

	return app;	
})