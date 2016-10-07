'use strict';

define([
	'consolidate', 'config', 'config-util', 'expressInit'  
],
function(consolidate, config, config-util, express){
	// CookieParser should be above session
	app.use(cookieParser());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	// static folders
	app.use(express.static('public'));
	app.use('/utils', express.static('utils'));

	// Setting the app router and static folder
	app.use(express.static(path.resolve('./public')));
	// server side templating 
	app.engine('html', consolidate.swig);
	app.set('view engine', 'html');
	app.set('views','./app/views');	

	app.locals.description = config.description;
	app.locals.keywords = config.keywords;
	app.locals.title = config.title;

	// files the layout html should include
	app.locals.cssFiles = configUtil.getCSSAssets( config.assets.css );
	app.locals.jsFiles = configUtil.getJavaScriptAssets( config.assets.js );

	// return app from requiring expressInit
	return app;
});

