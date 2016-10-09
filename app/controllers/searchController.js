'use strict';

define([
	'underscore', 
	'../../public/enums/searchTypeEnum',
	'../../public/enums/socketMessageEnum'
],
function( _, SearchTypeEnum, smEnum){
	return {
		getSearchResults: function(app, req, res){			
			return res.status(200).json({});
		}
	}
});