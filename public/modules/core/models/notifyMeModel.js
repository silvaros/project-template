define([
	'backbone'
],
function(Backbone){
	var NotifyMeModel = Backbone.Model.extend({
		defaults: { 
			email: '',
			zipCode: '',
			age:''
		},

		url: function(){
			return "";	
		}
	});

	return NotifyMeModel;
})