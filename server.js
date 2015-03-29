var express = require('express');
var app = express();
var config = require('./app/config/base')
	config.initializeApplication(app);

var PORT = process.env.PORT || 1337;

app.listen(PORT);
console.log('server started on port %s', PORT);






























