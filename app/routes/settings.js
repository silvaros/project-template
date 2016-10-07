'use strict';

define([
	'app/controllers/settingsController',
	'app/controllers/user/userAuthorizationController'
],
function(settingsCtlr, AuthCtlr){
	var checkLogin = AuthCtlr.checkLogin;

	return function(app){
		app.route('/api/settings')
		.get( checkLogin, settingsCtlr.getUserSettings )
		.patch( checkLogin, settingsCtlr.patchUserSetting );

		return app;
	}
});