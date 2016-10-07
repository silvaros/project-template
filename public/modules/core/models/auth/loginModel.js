'use strict';

define([
	'backbone'
],
function(Backbone){
	var LoginModel = Backbone.Model.extend({		
		url: function(){
			return "/api/login";	
		},

		defaults: { 
			password: '',
			userName: ''
		},

		validation: {
	        password: {
		      required: true,
		      msg: "Dude, enter a password."
		    },
	        userName: {
	            minLength: 4,
	            msg: "That's not enough characters."
	        },
	    }
	});

	return LoginModel;
})