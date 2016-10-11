'use strict';

define([
	'app/controllers/views/settingsController',
	'app/controllers/user/userAuthorizationController'
],
function(settingsCtlr, AuthCtlr){
	var checkLogin = AuthCtlr.checkLogin;

	return function(app){
		app.route('/api/settings')
		.get( checkLogin, settingsCtlr.getUserSettings );

		return app;
	}
});