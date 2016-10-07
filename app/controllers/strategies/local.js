'use strict';

define([
	'mongoose', 'passport', 'passport-local'
],
function(mongoose, passport, passportLocal){
	var LocalStrategy = passportLocal.Strategy;
	var User = mongoose.model('User');

	function doAuth(userName, password, done){
		User.findOne({ userName: userName }, function(err, user) {
			if (err) { return done(err); }
			if (!user) {
				return done(null, false, { message: 'Invalid Login' });
			}

			if (!user.authenticate(password)) {
				return done(null, false, { message: 'Invalid Login' });
			}

			return done(null, user);
		});
	}

	// Use local strategy
	passport.use( new LocalStrategy({ usernameField: 'userName',	passwordField: 'password' }, doAuth) );	

	return doAuth;
});