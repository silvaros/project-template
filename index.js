process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// first configure require
var requirejs = require('./app/config/init/requireInit');

// init app
requirejs(['appInit'], function(app){
	var PORT = process.env.PORT || 3001;
	app.listen(PORT);
	console.log('server started on port %s', PORT);	
});




























