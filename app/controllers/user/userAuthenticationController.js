'use strict';

define([
	'underscore', 'async', 'mongoose', 'passport', 
	'public/controllers/errorsController',
	'app/controllers/responseController',

	'app/controllers/emailController',
	'utils/js/crypto'
],
function( _, async, mongoose, passport, errorsCtlr, responseCtlr, emailCtlr, CryptoUtils){
	var VerifySignupModel = mongoose.model('VerifySignupModel');
	var UserModel = mongoose.model('User');

	function createVerifySignupToken(req, res, done){	
		var verifySignupModel = new VerifySignupModel();
		verifySignupModel.userName = req.body.userName;
		verifySignupModel.save(function(err) {
			done(err, verifySignupModel._doc.token); 
		});
	};

	return {
		login: function(req, res, next) {
			passport.authenticate('local', function(err, user, info) {
				if (err || !user) {
					return res.status(400).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation(info)) );
				} else {
					// Remove sensitive data before login
					user.password = undefined;
					user.salt = undefined;

					req.login(user, function(err) {
						if (err) {
							return res.status(400).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation(err)) );
						} else {
							return res.json(user);
						}
					});
				}
			})(req, res, next);
		},

		logout: function(req, res) {
			req.logout();
			res.redirect('/');
		},

		processVerifySignupToken: function(req, res){
			var token = req.params.token;
			// look for the token in the db
			VerifySignupModel.findOne({token: token}).exec(function(verifySignupFindErr, verifySignupRecord) {
				if(verifySignupFindErr) 
					return res.send(verifySignupFindErr);
				// record not found
				if(!verifySignupRecord) 
					return res.status(400).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation('Failed to find that verification token')) );

				// record found is token still valid
				var time = new Date().getTime();
				if(verifySignupRecord.expires < time) 
					return res.status(400).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation('The verification token has expired')) );

				// find the user in the db
				UserModel.findOne({userName: verifySignupRecord.userName}).exec(function(userFindErr, user){
					// Remove sensitive data before login
					delete user._doc.password;
					delete user._doc.salt;
					
					if(userFindErr) 
						return res.status(400).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation(userFindErr)) );
					// record not found
					if(!user)
						// this shouldnt happen, we created a verification token for a user that didnt get signed up? 
						return res.status(400).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation('Failed to find the user linked to that token')) );

					// this shouldnt happen, user would hit "token not found" since after 
					// a user is verified the record for the token is deleted
					if(user.role !== 'pending'){
						return res.status(400).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation('User linked to token is already verified')) );
					}
					else {
						// set the role
						user.role = 'user';
						//user.role = 'admin';
					
						user.save(function(err){
							if(err){
								return res.status(400).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation(err)) );
							}

							// delete the record in the collection, now that the user is verified
							//verifySignupRecord.remove();

							return res.status(200).end();
						});
					}					
				});
			});
		},
	
		resendVerifySignupToken: function(req, res){
			if(!req.body.userName){
				return res.status(400).json(responseCtlr.createErrorResponse(errorsCtlr.getValidation('No user name sent', 'resend')) );
			}

			// find the user in the db
			UserModel.findOne({userName: req.body.userName}).exec(function(userFindErr, user){
				if(userFindErr) 
					return res.status(400).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation(userFindErr, 'resend')) );
				// record not found
				if(!user)
					// this shouldnt happen, we created a verification token for a user that didnt get signed up? 
					return res.status(400).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation('Failed to find that user', 'resend')) );

				// Remove sensitive data before login
				delete user._doc.password;
				delete user._doc.salt;

				req.body.email = user.email;

				async.waterfall([
					// create verification record
					createVerifySignupToken.bind(this, req, res),
					// send user an email 
					emailCtlr.sendVerifySignupToken.bind(emailCtlr, req, res)
				], function(err){
					if(err){
						return res.status(400).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation(err, 'resend')) );
					}	

					return res.status(200).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation('Email Sent!', 'resend', 'success')) );
				});
			});
		},

		signup: function(req, res) {
			// For security measurement we remove the roles from the req.body object
			//delete req.body.role;
			
			// Init Variables
			var user = new UserModel(req.body);
			var message = null;

			// Add missing user fields
			user.provider = 'local';
			
			// Then save the user 
			user.save(function(err) {
				if (err) {
					var response = responseCtlr.createErrorResponse(errorsCtlr.getValidation(err));
					return res.status(400).json( response );
				} 
				else {
					// Remove sensitive data before login
					user.password = undefined;
					user.salt = undefined;
			
					async.waterfall([
						// create verification record
						createVerifySignupToken.bind(this, req, res),
    					// send user an email 
						emailCtlr.sendVerifySignupToken.bind(emailCtlr, req, res)
					], function(err){
						if(err){
							var response = responseCtlr.createErrorResponse(errorsCtlr.getValidation(err));
							return res.status(400).json( response );
						}

						return res.json({message: "Thanks we got it, check ur email to verify your account"});						
					});
				}
			});
		}
		/*,

		oauthCallback: function(strategy) {
			return function(req, res, next) {
				passport.authenticate(strategy, function(err, user, redirectURL) {
					if (err || !user) {
						return res.redirect('/#!/signin');
					}
					req.login(user, function(err) {
						if (err) {
							return res.redirect('/#!/signin');
						}

						return res.redirect(redirectURL || '/');
					});
				})(req, res, next);
			};
		},

		// Helper function to save or update a OAuth user profile
		saveOAuthUserProfile: function(req, providerUserProfile, done) {
			if (!req.user) {
				// Define a search query fields
				var searchMainProviderIdentifierField = 'providerData.' + providerUserProfile.providerIdentifierField;
				var searchAdditionalProviderIdentifierField = 'additionalProvidersData.' + providerUserProfile.provider + '.' + providerUserProfile.providerIdentifierField;

				// Define main provider search query
				var mainProviderSearchQuery = {};
				mainProviderSearchQuery.provider = providerUserProfile.provider;
				mainProviderSearchQuery[searchMainProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentifierField];

				// Define additional provider search query
				var additionalProviderSearchQuery = {};
				additionalProviderSearchQuery[searchAdditionalProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentifierField];

				// Define a search query to find existing user with current provider profile
				var searchQuery = {
					$or: [mainProviderSearchQuery, additionalProviderSearchQuery]
				};

				User.findOne(searchQuery, function(err, user) {
					if (err) {
						return done(err);
					} else {
						if (!user) {
							var possibleUsername = providerUserProfile.userName || ((providerUserProfile.email) ? providerUserProfile.email.split('@')[0] : '');

							User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
								user = new User({
									firstName: providerUserProfile.firstName,
									lastName: providerUserProfile.lastName,
									userName: availableUsername,
									displayName: providerUserProfile.displayName,
									email: providerUserProfile.email,
									provider: providerUserProfile.provider,
									providerData: providerUserProfile.providerData
								});

								// And save the user
								user.save(function(err) {
									return done(err, user);
								});
							});
						} else {
							return done(err, user);
						}
					}
				});
			} else {
				// User is already logged in, join the provider data to the existing user
				var user = req.user;

				// Check if user exists, is not signed in using this provider, and doesn't have that provider data already configured
				if (user.provider !== providerUserProfile.provider && (!user.additionalProvidersData || !user.additionalProvidersData[providerUserProfile.provider])) {
					// Add the provider data to the additional provider data field
					if (!user.additionalProvidersData) user.additionalProvidersData = {};
					user.additionalProvidersData[providerUserProfile.provider] = providerUserProfile.providerData;

					// Then tell mongoose that we've updated the additionalProvidersData field
					user.markModified('additionalProvidersData');

					// And save the user
					user.save(function(err) {
						return done(err, user, '/#!/settings/accounts');
					});
				} else {
					return done(new Error('User is already connected using this provider'), user);
				}
			}
		},

		removeOAuthProvider: function(req, res, next) {
			var user = req.user;
			var provider = req.param('provider');

			if (user && provider) {
				// Delete the additional provider
				if (user.additionalProvidersData[provider]) {
					delete user.additionalProvidersData[provider];

					// Then tell mongoose that we've updated the additionalProvidersData field
					user.markModified('additionalProvidersData');
				}

				user.save(function(err) {
					if (err) {
						return res.status(400).json( errorsCtlr.getValidation(err) );
					} else {
						req.login(user, function(err) {
							if (err) {
								res.status(400).json( errorsCtlr.getValidation(err) );
							} else {
								res.jsonp(user);
							}
						});
					}
				});
			}
		}
		*/
	}
});