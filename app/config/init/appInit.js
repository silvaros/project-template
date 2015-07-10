// loaded first in index.js
define([
	'globber', 'path', 'expressInit'
],
function( globber, path, app ){
	// return app from requiring expressInit, 
	// NOTE: not sure if I like this pattern
	return app;
});