'use strict';

define([
	'config', 'config-util', 'expressInit'
],
function(config, configUtil, app){
	app.locals.description = config.description;
	app.locals.keywords = config.keywords;
	app.locals.title = config.title;

	// files the layout html should include
	app.locals.cssFiles = configUtil.getCSSAssets( config.assets.css );
	app.locals.jsFiles = configUtil.getJavaScriptAssets( config.assets.js );
	
	// return app from requiring expressInit
	return app;
});

