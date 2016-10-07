'use strict';

define([

],
function(){
	return {
		createErrorResponse: function(validation){
			return { validations: validation };
		},

		create: function(res, status, config){
			//if config is string
			// create a validation 

			//if config is an object
			/* 
			for(var key in config){ 
					
			}
			// look for message
			// look for keyPrefix
			// look for key
			// look for isValid
			// create a validation 

			//if none of 
			*/
		}

	}
});