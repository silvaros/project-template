'use strict';

define([
	'underscore',
	 (process.env.NODE_ENV || 'development')+ '-config'	//environment config only needs "development" atm
],
function(_, envConfig ){
	return _.extend({
		title: 'New Project Title', 
		description: '',
		keywords: '',
		templateEngine: 'swig'
	}, envConfig || {});
});
