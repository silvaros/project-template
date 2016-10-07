'use strict';

define([
	'underscore', 'async', 'crypto', 'mongoose', 'nodemailer', 'passport',
	'config', 'public/controllers/errorsController', 'app/controllers/responseController'
],
function( _ , async, crypto, mongoose, nodemailer, passport, config, errorsCtlr, responseCtlr){
	var User = mongoose.model('User');
	
	return {
		changePassword: function(req, res, next) {
			// Init Variables
			var passwordDetails = req.body;
			var message = null;

			if (req.user) {
				if (passwordDetails.newPassword) {
					User.findById(req.user.id, function(err, user) {
						if (!err && user) {
							if (user.authenticate(passwordDetails.currentPassword)) {
								if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
									user.password = passwordDetails.newPassword;

									user.save(function(err) {
										if (err) {
											return res.status(400).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation(err)) );
										} else {
											req.login(user, function(err) {
												if (err) {
													res.status(400).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation(err)) );
												} else {
													res.json({
														message: 'Password changed successfully'
													});
												}
											});
										}
									});
								} else {
									res.status(400).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation('Passwords do not match')) );
								}
							} else {
								res.status(400).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation('Current password is incorrect')) );
							}
						} else {
							res.status(400).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation('User is not found')) );
						}
					});
				} else {
					res.status(400).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation('Please provide a new password')) );
				}
			} else {
				res.status(400).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation('User is not signed in')) );
			}
		},

		forgot: function(req, res, next) {
			async.waterfall([
				// Generate random token
				function(done) {
					crypto.randomBytes(20, function(err, buffer) {
						var token = buffer.toString('hex');
						done(err, token);
					});
				},
				// Lookup user by userName
				function(token, done) {
					if (req.body.userName) {
						User.findOne({
							userName: req.body.userName
						}, '-salt -password', function(err, user) {
							if (!user) {
								return res.status(400).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation('No account with that userName has been found')) );
							} else if (user.provider !== 'local') {
								return res.status(400).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation('It seems like you signed up using your ' + user.provider + ' account')) );
							} else {
								user.resetPasswordToken = token;
								user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

								user.save(function(err) {
									done(err, token, user);
								});
							}
						});
					} else {
						return res.status(400).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation('Username field must not be blank')) );
					}
				},
				function(token, user, done) {
					res.render('templates/reset-password-email', {
						name: user.displayName,
						appName: config.app.title,
						url: 'http://' + req.headers.host + '/auth/reset/' + token
					}, function(err, emailHTML) {
						done(err, emailHTML, user);
					});
				},
				// If valid email, send reset email using service
				function(emailHTML, user, done) {
					var smtpTransport = nodemailer.createTransport(config.mailer.options);
					var mailOptions = {
						to: user.email,
						from: config.mailer.from,
						subject: 'Password Reset',
						html: emailHTML
					};
					smtpTransport.sendMail(mailOptions, function(err) {
						if (!err) {
							res.json({
								message: 'An email has been sent to ' + user.email + ' with further instructions.'
							});
						}

						done(err);
					});
				}
			], function(err) {
				if (err) return next(err);
			});
		},

		reset: function(req, res, next) {
			// Init Variables
			var passwordDetails = req.body;
			var message = null;

			async.waterfall([

				function(done) {
					User.findOne({
						resetPasswordToken: req.params.token,
						resetPasswordExpires: {
							$gt: Date.now()
						}
					}, function(err, user) {
						if (!err && user) {
							if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
								user.password = passwordDetails.newPassword;
								user.resetPasswordToken = undefined;
								user.resetPasswordExpires = undefined;

								user.save(function(err) {
									if (err) {
										return res.status(400).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation(err)) );
									} else {
										req.login(user, function(err) {
											if (err) {
												res.status(400).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation(err)) );
											} else {
												// Return authenticated user 
												res.jsonp(user);

												done(err, user);
											}
										});
									}
								});
							} else {
								return res.status(400).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation( 'Passwords do not match')) );
							}
						} else {
							return res.status(400).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation('Password reset token is invalid or has expired.')) );
						}
					});
				},
				function(user, done) {
					res.render('templates/reset-password-confirm-email', {
						name: user.displayName,
						appName: config.app.title
					}, function(err, emailHTML) {
						done(err, emailHTML, user);
					});
				},
				// If valid email, send reset email using service
				function(emailHTML, user, done) {
					var smtpTransport = nodemailer.createTransport(config.mailer.options);
					var mailOptions = {
						to: user.email,
						from: config.mailer.from,
						subject: 'Your password has been changed',
						html: emailHTML
					};
					
					smtpTransport.sendMail(mailOptions, function(err) {
						done(err, 'done');
					});
				}
			], function(err) {
				if (err) return next(err);
			});
		},

		validateResetToken: function(req, res) {
			User.findOne({
				resetPasswordToken: req.params.token,
				resetPasswordExpires: {
					$gt: Date.now()
				}
			}, function(err, user) {
				if (!user) {
					return res.redirect('/password/reset/invalid');
				}

				res.redirect('/password/reset/' + req.params.token);
			});
		}
	};
});