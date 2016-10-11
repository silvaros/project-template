'use strict';

define([
	'app/controllers/views/searchController',
	'app/controllers/user/userAuthorizationController'	
],
function(SearchCtlr, AuthCtlr){
	return function(app){
		app.get('/api/search/:type/:term', AuthCtlr.checkLogin, SearchCtlr.getSearchResults.bind(SearchCtlr, app));
		return app;
	}
});