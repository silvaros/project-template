'use strict';

define([
	'underscore',

	'public/enums/socketMessageEnum',

	'./user/userAuthenticationController',
	'./user/userAuthorizationController',
	'./user/userPasswordController',
	'./user/userProfileController'
],
function( _, smEnum, userAuthenticationController, userAuthorizationController, userPasswordController, userProfileController){
	return _.extend(
		userAuthenticationController,
		userAuthorizationController,
		userPasswordController,
		userProfileController
	);
});

	