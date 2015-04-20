// first configure require
var requirejs = require('./app/requireInit');

// init app
requirejs(['config/appInit'], function(app){
	var PORT = process.env.PORT || 3000;
	app.listen(PORT);
	console.log('server started on port %s', PORT);	
});




























