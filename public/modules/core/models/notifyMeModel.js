define([
	'backbone'
],
function(Backbone){
	var NotifyMeModel = Backbone.Model.extend({		
		url: function(){
			return "/api/notifyme";	
		},

		defaults: { 
			email: '',
			zipCode: '',
			age:''
		},

		// currently this is used
		validate: function (attrs) {
		    var errors = [];

		    if (!attrs.email) {
		        errors.push({name: 'email', message: 'Please add an email.'});
		    }
		    if (!attrs.zipCode) {
		        errors.push({name: 'zipcode', message: 'Please add a zipcode.'});
		    }

		    return errors.length > 0 ? errors : false;
		},

		// would like to use this way
		validation: {
	        email: [{
		      required: true,
		      msg: 'Please enter an email address'
		    },{
		      pattern: 'email',
		      msg: 'Please enter a valid email'
		    }],
	        // password: {
	        //     minLength: 8
	        // },
	        // repeatPassword: {
	        //     equalTo: 'password',
	        //     msg: 'The passwords does not match'
	        // },
	        // gender: {
	        //     required: false
	        // },
	       	zipCode: {
	            required: true,
	            msg: 'Please enter a valid zipcode'
	        },
	        age: {
	            required: false,
	            range: [18, 100]
	        }
	    }
	});

	return NotifyMeModel;
})