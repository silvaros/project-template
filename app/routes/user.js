'use strict';

define([
	'app/controllers/userController'
],
function(userCtlr){
	return function(app){
		// Routes using the request/session user 
		app.route('/api/me').get(userCtlr.me);
		
		app.route('/api/verifySignup/resend').post(userCtlr.resendVerifySignupToken);
		app.route('/api/verifySignup/:token').get(userCtlr.processVerifySignupToken);

		app.route('/api/login').post(userCtlr.login);
		app.route('/api/logout').get(userCtlr.logout);
		app.route('/api/signup').post(userCtlr.signup);
	
		// Finish by binding the user middleware
		//app.param('userId', userCtlr.userByID);
		
		return app;
	}
});