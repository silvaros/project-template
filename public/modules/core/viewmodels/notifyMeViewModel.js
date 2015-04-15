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

		    // Temporary for Presentation
		    this.emailSubmitted = ko.observable("");

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

			this.signup = function(vm) {
		    	return vm.model().save(null, {
		    		success: function(){
		    			//self.hideErrors(errors);
		    			//debugger	
		    		},
		    		error: function() {
		    			//self.showErrors(errors);
		    			//debugger
		    		},
		    		validate: true
		    	});	
			}
	    },

	    onNotifyMeClick: function(vm, e){
	    	var self = this;

	    	console.log("vm.email : ", vm.email());
	    	console.log("vm.zipCode : ", vm.zipCode());
	    	console.log("vm.age : ", vm.age());

//COMMENTING OUT FOR NOW SINCE I RAN INTO A CONFLICT

			// var emailRx = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
   //  		if( !vm.email() || !emailRx.test(vm.email()) ) {
	  //   		$('#email').css('display','block');
	  //   	}
	  //   	else {
			// 	$('#email').css('display','none');
		    	
		 //    	vm.model().save(null, {
		 //    		success: function(model, resp){
		 //    			$('#confirmMsg').css('display','block').text(resp.responseJSON.msg);
		 //    			//self.hideErrors(errors);
		 //    		},
		 //    		error: function() {
		 //    			//self.showErrors(errors);
		 //    		},
		 //    		validate: false
		 //    	})
		 //    }

	    	// HACK FOR NOW UNTIL WE CAN GET BACKBONE VALIDATION PROPERLY IMPLEMENTED
	    	if(!vm.email()) {
	    		$('.alert.email').css('display','block');
	    	}

	    	if(!vm.zipCode()) {
	    		$('.alert.zipcode').css('display','block');
	    	}

	    	if(vm.email()) {
	    		$('.alert.email').css('display','none');
	    	}
	    	if(vm.zipCode()) {
	    		$('.alert.zipcode').css('display','none');
	    	}

	    	if(vm.email() && vm.zipCode()) {
	    		$('.notify-form.signup').css('display','none');
	    		$('.notify-form.success').css('display','block');

	    		self.emailSubmitted(vm.email());

	    		self.signup(vm);
	    	}
	    	// END HACK
	    }
	});
})