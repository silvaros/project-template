use strict';

define([
	'body-parser', 'cookie-parser', 'connect-mongo', 'express', 'express-session', 'mongoose', 'path', 'passport',
	// local modeules
	'config', 'globber', 'app/controllers/passportController'
],
function(bodyParser, cookieParser, connectMongo, express, session, mongoose, path, passport, 
		 config, globber, passportController)
{
	var app = express();
	app.config = config;
	
	// Setup mongo session, connection	
	var	mongoStore = connectMongo(session);
	var	db = mongoose.connect(app.config.db.path,
	function(err) {
		if (err) {
			console.error('\x1b[31m', 'Could not connect to MongoDB!');
			console.log(err);
			return;
		}

		// load models before routes
		globber.get('./app/models/**/*.js').forEach(function(modelPath) {
			require(path.resolve(modelPath));
		});

		// CookieParser should be above session
		app.use(cookieParser());

		app.use(session({
			saveUninitialized: true,
			resave: false,
			secret: app.config.db.sessionSecret,
			store: new mongoStore({
				db: db.connection.db,
				collection: app.config.db.sessionCollection,
				ttl: 6*3600 // 6 hr session
			})
		}));

	    // passport middleware before routes
		app.use(passport.initialize());
		app.use(passport.session());

		// load routes 
		var files = globber.get('./app/routes/**/*.js');
		files.forEach(function(route) {
			require(path.resolve(route))(app);
		});

		// this should always be the last route for a single page app.
		app.route('/*').get(function(req, res){
	  		res.render('index');
		});

		// made this a function so that we could load models before require tries to load them
		passportController();
	});

	return app;
});