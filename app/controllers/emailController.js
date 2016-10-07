'use strict';

define([
	'async', 'nodemailer',
	'config'
],
function(async, nodemailer, config){
	return {
		sendVerifySignupToken: function(req, res, token, done){
			var user = req.body;
			var htmlConfig = {
				userName: req.body.userName,
				url: 'http://' + req.headers.host + '/verifySignup/' + token
			}

			res.render('email/verifySignup', htmlConfig, function(err, emailHTML){
				if(err){
					done(err);
					return;
				}

				var smtpTransport = nodemailer.createTransport(config.mailer.options);
				var mailOptions = {
					to: user.email,
					from: config.mailer.from,
					subject: 'Verify Email Address',
					html: emailHTML
				};

				smtpTransport.sendMail(mailOptions, done);
			});
		}
	}
});