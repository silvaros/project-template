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
	
		app.route('/api/neighbors').get(userCtlr.checkLogin, userCtlr.getNeighbors.bind({},app) );

		// Routes that can apply to any user
		app.route('/api/user/:userName/collections').get(userCtlr.checkLogin, userCtlr.getUserCollections.bind({},app) );
		app.route('/api/user/:userName/collections/:collectionName').get(userCtlr.checkLogin, userCtlr.getUserCollections.bind({},app) );

		// Finish by binding the user middleware
		//app.param('userId', userCtlr.userByID);
		
		return app;
	}
});