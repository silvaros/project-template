define([
	'knockout',
	'knockback'
],
function(ko, kb){
	return kb.ViewModel.extend({
	    constructor: function(model, options) {
	    	this.model = ko.observable(model);
		    this.email = kb.observable(model, {key: 'email'});
		    this.zipCode = kb.observable(model, {key: 'zipCode'});
		    this.age = kb.observable(model, {key: 'age'});
	    },

	    onNotifyMeClick: function(vm, e){
	    	vm.model().save(null, {
	    		success: function(){
	    			debugger	
	    		},
	    		error: function() {
	    			debugger
	    		}
	    	})
	    }
	});
})