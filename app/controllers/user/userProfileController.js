'use strict';

define([
	'underscore', 'mongoose', 'passport',
	'public/controllers/errorsController', 'app/controllers/responseController',
	'public/enums/socketMessageEnum'
],
function( _ , mongoose, passport, errorsCtlr, responseCtlr, smEnum){
	return {
		update: function(req, res) {
			// Init Variables
			var user = req.user;
			var message = null;

			// For security measurement we remove the roles from the req.body object
			delete req.body.roles;

			if (user) {
				// Merge existing user
				user = _.extend(user, req.body);
				user.updated = Date.now();
				user.displayName = user.firstName + ' ' + user.lastName;

				user.save(function(err) {
					if (err) {
						return res.status(400).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation(err)) );
					} else {
						req.login(user, function(err) {
							if (err) {
								return res.status(400).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation(err)) );
							} else {
								return res.jsonp(user);
							}
						});
					}
				});
			} else {
				return res.status(400).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation('User is not signed in')) );
			}
		},

		me: function(req, res) {
			res.jsonp(req.user || {});
		}
	}
});