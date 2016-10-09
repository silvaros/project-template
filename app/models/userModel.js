'use strict';

define([
	'utils/js/crypto', 'mongoose'
],
function(cryptoUtil, mongoose){
	var Schema = mongoose.Schema;

	var validateLocalStrategyProperty = function(property) {
		return ((this.provider !== 'local' && !this.updated) || property.length);
	};

	var validateLocalStrategyPassword = function(password) {
		return (this.provider !== 'local' || (password && password.length > 7));
	};

	var UserSchema = new Schema({
		email: {
			type: String,
			trim: true,
			default: '',
			validate: [validateLocalStrategyProperty, 'Invalid email address'],
			match: [/.+\@.+\..+/, 'Invalid email address']
		},
		userName: {
			type: String,
			unique: "User already exists",
			required: 'Please fill in a user name',
			trim: true
		},
		password: {
			type: String,
			default: '',
			validate: [validateLocalStrategyPassword, 'Password needs 8 characters']
		},
		salt: {
			type: String
		},
		provider: {
			type: String,
			required: 'Provider is required'
		},
		providerData: {},
		additionalProvidersData: {},
		role: {
			type: String,
			enum: ['pending', 'user', 'admin'],
			default: ['pending']
		},
		updated: {
			type: Date
		},
		created: {
			type: Date,
			default: Date.now
		},
		/* For reset password */
		resetPasswordToken: {
			type: String
		},
	  	resetPasswordExpires: {
	  		type: Date
	  	}
	});

	/**
	 * Hook a pre save method to hash the password
	 */
	UserSchema.pre('save', function(next) {
		if (this.password && this.password.length > 6) {
			this.password = this.hashPassword(this.password);
		}

		next();
	});

	/**
	 * Create instance method for hashing a password
	 */
	UserSchema.methods.hashPassword = function(password) {
		return cryptoUtil.encrypt(password);
	};

	/**
	 * Create instance method for authenticating user
	 */
	UserSchema.methods.authenticate = function(password) {
		return this.password === this.hashPassword(password);
	};

	/**
	 * Find possible not used userName
	 */
	UserSchema.statics.findUniqueUsername = function(userName, suffix, callback) {
		var _this = this;
		var possibleUsername = userName + (suffix || '');

		_this.findOne({
			userName: possibleUsername
		}, function(err, user) {
			if (!err) {
				if (!user) {
					callback(possibleUsername);
				} else {
					return _this.findUniqueUsername(userName, (suffix || 0) + 1, callback);
				}
			} else {
				callback(null);
			}
		});
	};

	mongoose.model('User', UserSchema, 'users');
});