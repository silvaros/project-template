'use strict';

define([
	'mongoose', 'passport', 'path',
	// local modules
	'globber'
],
function(mongoose, passport, path, globber){
	return function(){
		var User = mongoose.model('User');

		// Serialize sessions
		passport.serializeUser(function(user, done) {
			done(null, user.id);
		});

		// Deserialize sessions
		passport.deserializeUser(function(id, done) {
			User.findOne({ _id: id }, '-salt -password', function(err, user) { done(err, user); });
		});

		// Initialize strategies
		globber.get('./app/controllers/strategies/**/*.js').forEach(function(strategy) {
			require(path.resolve(strategy));
		});
	}
});
