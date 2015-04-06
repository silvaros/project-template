// loaded first in index.js
define([
	'globber', 'path', './expressInit'
],
function( globber, path, app ){
	// register routes
	var files = globber.get('./app/routes/*.js');
	console.log('files.length = ' + files.length);
	files.forEach(function(route) {
		console.log('registering');
		require(path.resolve(route))(app);
	});

	// return app from requiring expressInit, 
	// NOTE: not sure if I like this pattern
	return app;
});