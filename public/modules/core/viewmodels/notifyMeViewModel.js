define([
	'knockout',
	'knockback',
	'jquery'
],
function(ko, kb, $){
	return kb.ViewModel.extend({

	    constructor: function(model, options) {
	    	this.model = ko.observable(model);
		    this.email = kb.observable(model, {key: 'email'});
		    this.zipcode = kb.observable(model, {key: 'zipcode'});
		    this.age = kb.observable(model, {key: 'age'});
	    },

	    clearForm: function(){
	    	// not input validation, we can use display
	    	$('#confirmMsg').css('display','none');
	        $('#notifyBtn').removeClass('disabled');

	        this.clearErrors();

	        this.email("");
			this.zipcode("");
			this.age("");
		},

	    clearErrors: function(){
	    	$('.validation-input').removeClass('error');
	    },

	    onNotifyMeClick: function(vm, e){
	    	this.clearErrors();

			var passed = true;

			var emailStr = vm.email();
			var zipcodeStr = vm.zipcode();
			var ageStr = vm.age();
			
			var emailInputDiv = $('.validation-input.email');
			var zipcodeInputDiv = $('.validation-input.zipcode');
			var ageInputDiv = $('.validation-input.age');

			var emailRx = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    		if( !emailStr || !emailRx.test(emailStr) ) {
    			emailInputDiv.addClass('error');
    			passed = false;
	    	}

	    	if( zipcodeStr != "" && (zipcodeStr.length !== 5 || isNaN(zipcodeStr)) ) {
	    		zipcodeInputDiv.addClass('error');
	    		passed = false;
	    	}
	    	
	    	if( ageStr != "" && (isNaN(ageStr) || parseInt(ageStr) > 120 || parseInt(ageStr) < 17) ) {
	    		ageInputDiv.addClass('error');
	    		passed = false;
			}
	    	
	    	if(passed) {
	    		$(e.target).addClass('disabled');
				
		    	vm.model().save(null, {
		    		success: function(model, resp) {
		    			$('#confirmMsg').css('display','block').text(resp.responseJSON.msg);
		    		}.bind(this),
		    		error: function() {
		    			$(e.target).removeClass('disabled');
		    		}.bind(this),
		    		validate: false
		    	});
		    }
	    }
	});
})