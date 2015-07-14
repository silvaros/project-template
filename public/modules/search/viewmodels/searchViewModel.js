define([
	'knockout'
],
function(ko){
	return {
		name: ko.observable('russel'),
		goToAbout: function(){
			App.Router.navigate('about', {trigger: true});
		}
	}	
});