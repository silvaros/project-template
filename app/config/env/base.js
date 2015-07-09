define([
	'underscore',
	'./' + process.env.NODE_ENV	//environment config only needs "development" atm
],
function(_, envConfig ){
	return _.extend({
		title: 'New Project Title', 
		description: '',
		keywords: '',
		templateEngine: 'jade'
	}, envConfig || {});
});
