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
		    this.zipCode = kb.observable(model, {key: 'zipCode'});
		    this.age = kb.observable(model, {key: 'age'});

		   	this.showErrors = function(errors) {
			    _.each(errors, function (error) {
			        var controlGroup = this.$('.' + error.name);
			        controlGroup.addClass('error');
			        controlGroup.find('.help-inline').text(error.message);
			    }, this);
			};

			this.hideErrors = function () {
			    this.$('.control-group').removeClass('error');
			    this.$('.help-inline').text('');
			};
	    },

	    clear: function(){
	    	$('#confirmMsg').css('display','none')
	    	$('#email').css('display','none');
		    $('#notifyBtn').removeClass('disabled');				
	    },

	    onNotifyMeClick: function(vm, e){
			var emailRx = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    		if( !vm.email() || !emailRx.test(vm.email()) ) {
	    		$('#email').css('display','block');
	    	}
	    	else {
	    		$(e.target).addClass('disabled');
				$('#email').css('display','none');
		    	
		    	vm.model().save(null, {
		    		success: function(model, resp){
		    			$('#confirmMsg').css('display','block').text(resp.responseJSON.msg);
		    			//this.hideErrors(errors);
		    		}.bind(this),
		    		error: function() {
		    			$(e.target).removeClass('disabled');
		    			//this.showErrors(errors);
		    		}.bind(this),
		    		validate: false
		    	})
		    }
	    }
	});
})