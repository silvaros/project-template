define([
	'underscore',
	 process.env.NODE_ENV + '-config'	//environment config only needs "development" atm
],
function(_, envConfig ){
	return _.extend({
		title: 'New Project Title', 
		description: '',
		keywords: '',
		templateEngine: 'jade'
	}, envConfig || {});
});
