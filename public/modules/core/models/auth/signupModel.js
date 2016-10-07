'use strict';

define([
	'backbone'
],
function(Backbone){
	var SignupModel = Backbone.Model.extend({		
		url: function(){
			return "/api/signup";	
		},

		defaults: { 
			email: '',
			password: '',
			userName: ''
		},

		validation: {
	        email: [{
			    required: true,
			    msg: 'An email address is required'
		    },{
				pattern: 'email',
				msg: 'That is not an email address'
		    }],
	        password: {
           		minLength: 8
	        },
	        // repeatPassword: {
	        //     equalTo: 'password',
	        //     msg: 'The passwords does not match'
	        // },
	        userName: {
	            minLength: 4
	        },
	    }
	});

	return SignupModel;
})