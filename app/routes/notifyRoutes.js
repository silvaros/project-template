'use strict';

define([
	'app/controllers/notifyMeController'
],
function(notifyMeCtlr){
	return function(app){
		// serve an empty page that just loads the browserify bundle
		app.route('/api/notifyme').post(notifyMeCtlr.newNotifyMe);
	}
});