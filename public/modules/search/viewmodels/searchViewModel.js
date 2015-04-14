define([
	'knockout'
],
function(ko){
	return {
		name: ko.observable('russel'),
		goToAbout: function(){
			Gymme.Router.navigate('about', {trigger: true});
		}
	}	
});