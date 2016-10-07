'use strict';

define([
	'underscore', 'mongoose',
	'public/controllers/errorsController',
	'app/controllers/responseController'
],
function( _ , mongoose, errorsCtlr, responseCtlr){
	var User = mongoose.model('User');

	return {
		// userByID: function(req, res, next, id) {
		// 	User.findOne({
		// 		_id: id
		// 	}).exec(function(err, user) {
		// 		if (err) return next(err);
		// 		if (!user) return next(new Error('Failed to load User ' + id));
		// 		req.profile = user;
		// 		next();
		// 	});
		// },

		// Require login routing middleware
		checkLogin: function(req, res, next) {
			if (!req.isAuthenticated()) {
				return res.status(401).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation('User is not logged in')) );
			}

			next();
		},

		// User authorizations routing middleware
		hasAuthorization: function(roles) {
			var _this = this;

			return function(req, res, next) {
				_this.checkLogin(req, res, function() {
					if (_.intersection(req.user.roles, roles).length) {
						return next();
					} else {
						return res.status(403).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation('User is not authorized')) );
					}
				});
			};
		}
	}
});
