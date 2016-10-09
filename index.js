process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// first configure require
var requirejs = require('./app/config/init/requireInit');

// init app
requirejs([	
	'appInit',
	'http',
	'socket.io'
], function(app, http, io){
	const port = process.env.PORT || app.config.port || 3001;
	const server = http.createServer(app);
  	//var socket = io.listen(server);

  	server.listen(port, function() { 
		console.log('Server started on port %s', port);
	});
});




























