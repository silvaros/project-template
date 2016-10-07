'use strict';

define([
	'underscore',
	'knockout',
	'modules/core/bindings/valid'
],
function( _, ko){
	var StatusEnum = {
		Error: 'error',
		Loading: 'loading',
		Success: 'success',
		Created: 'created'
	};

	var VerifySignupViewModel = function(token){
		this.statusEnum = StatusEnum;
			
		this.requestNewTokenValue = ko.observable();
		this.status = ko.observable(StatusEnum.Created);
		this.token = ko.observable(token);

		// TODO: finish validation
		this.verifyMessage = ko.observable();
		
		this.templateToShow = ko.computed(function(){
			return 'verify-' + this.status();
		}, this);

		if(token)
			this.verifyToken();
		
		return this;
	}

	VerifySignupViewModel.prototype.verifyToken = function(){
		this.status(StatusEnum.Loading);

		return $.ajax({
			context: this,
			url: '/api/verifySignup/'+ this.token(),
			success: function(user){
				debugger
				this.status(StatusEnum.Success);
				this.verifyMessage("");
				
				// update user (role)
				App.User.set(user);
			},
			error: function(resp){
				this.status(StatusEnum.Error);
				this.verifyMessage(resp.responseJSON.validations.error.message);
			}
		});		
	};

	VerifySignupViewModel.prototype.onRequestNewTokenClick = function(){
		if(_.isEmpty(this.requestNewTokenValue()))
			return this.validations({resend: {message: 'Enter a user name'}});
		else
			this.validations({});

		return $.ajax({
			context: this,
			method: "POST",
			url: '/api/verifySignup/resend',
			data: {userName: this.requestNewTokenValue()},
			success: function(resp){
				this.validations(resp.validations);
			}
		});
	}

	VerifySignupViewModel.prototype.onGetStartedClick = function(){
		return App.User.fetch().done(function(model){
			App.goTo('/');
		});
	}
	
	return VerifySignupViewModel;
});