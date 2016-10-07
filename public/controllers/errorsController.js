'use strict';

define([
	'underscore'
],
function( _ ){
	function getFieldName(str){
		return str.substring(str.lastIndexOf('.$') + 2, str.lastIndexOf('_1'));
	}

	var getUniqueErrorMessage = function(err) {
		var output;
		
		try {
			var fieldName = getFieldName(err.errmsg);
			output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exist';

		} catch(ex) {
			output = 'Unique field already exist';
		}

		return output;
	};

	return {
		getMessage: function(err){
			var message;
			if(_.isString(err)) message = err;
			else message = err.message;

			return message;
		},

		getValidation: function(err, key, type){
			var message = '';
			
			if(err.code === 11000 || err.code === 11001){
				message = getUniqueErrorMessage(err);
				key = getFieldName(err.errmsg);
			}
			else {
				message = this.getMessage(err);
			}
			
			var validation = {};
			validation[key || 'error'] = { message: message, type: type || 'error' };

			return validation;
		}
	}
});