// loaded first in index.js
define([ 'expressInit'],
function(app){
	// return app from requiring expressInit, 
	// NOTE: not sure if I like this pattern
	return app;
});