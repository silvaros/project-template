// loaded first in index.js
define([
	'globber', 'path', './expressInit'
],
function( globber, path, app ){
	// register routes
	var files = globber.get('./app/routes/*.js');
	files.forEach(function(route) {
		require(path.resolve(route))(app);
	});

	// return app from requiring expressInit, 
	// NOTE: not sure if I like this pattern
	return app;
});