var path = require('path');

var express = require('express');
var app = express();

var config = require('./app/config/base');
config.initializeApplication(app);

// set .html as the default extension
// Setting the app router and static folder
app.use(express.static(require('path').resolve('./public')));

var PORT = process.env.PORT || 4000;

app.listen(PORT);
console.log('server started on port %s', PORT);






























