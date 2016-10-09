'use strict';

define([
	'crypto', 'mongoose'
],
function(crypto, mongoose){
	var Schema = mongoose.Schema;

	var VerifySignupSchema = new Schema({
		created: {
			type: Date,
			default: Date.now
		},
		userName: {
			type: String,
			trim: true,
			default: ''
		},
		expires: {
	  		type: Date
	  	},
	  	token: {
			type: String
		}
	});

	// Hook a pre save method to hash the password
	VerifySignupSchema.pre('save', function(next) {
		var expiresDate = new Date().getTime() + (1000 * 60 * 60 * 24)*3;
		this.expires = new Date(expiresDate);
		
		var buffer = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.token = buffer.toString('hex');
	
		next();
	});

	mongoose.model('VerifySignupModel', VerifySignupSchema, 'accountVerifications');
});