'use strict';

define([	
	'knockout',
	'knockback',

	'modules/core/models/auth/signupModel',
	'modules/core/bindings/valid',
],
function(ko, kb, SignupModel){
	var SignupViewModel = kb.ViewModel.extend({
		constructor: function() {			
			kb.ViewModel.prototype.constructor.call(this, new SignupModel(), [ 'email', 'password', 'userName' ]);
			this.saving = ko.observable(false);
		},

		onSignupClick: function(vm, e){
			if(!this.saving()){
				this.saving(true);
				this.model().save(null, {
					success: function(){ 
						this.saving(false);
						App.goTo('verifySignup');
					}.bind(this),
					error: function(){
						this.saving(false);
					}.bind(this)
				});

				// if the model is invalid on save, it doesn't reset saving()
				// since it has not done an ajax request the code is handled sync not async
				if(!this.model().isValid()){
					this.saving(false);
				}
			}
		}
	});	

	return SignupViewModel;
});