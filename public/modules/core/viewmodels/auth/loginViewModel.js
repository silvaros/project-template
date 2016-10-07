'use strict';

define([	
	'knockout',
	'knockback',

	'modules/core/models/auth/loginModel',
	'modules/core/bindings/valid',

	'utils/js/namespace'
],
function(ko, kb, LoginModel, ValidationCtlr, nsUtil){
	var LoginViewModel = kb.ViewModel.extend({
		constructor: function() {			
			kb.ViewModel.prototype.constructor.call(this, new LoginModel());
		},
		
		onForgotClick: function(){
			
		},
		
		onLoginClick: function(vm, e){
			this.model().save(null, {
				success: function(user){ 
					App.User.set(user.toJSON());
					App.goTo('user/'+ App.User.userName() +'/collections');
				}
			});
		},

		onSignupClick: function(){
			App.goTo('signup');
		}
	});	

	return LoginViewModel;
});