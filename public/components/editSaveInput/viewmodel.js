'use strict';

define([
	'jquery',
	'underscore',
	'knockout',
	'knockback',

	'controllers/errorsController',

	'modules/core/bindings/valid'
],
function($, _ , ko, kb, errorCtlr){
	return kb.ViewModel.extend({
	    constructor: function(vm, options){
	    	// just a quick safe guard
	    	if(options.value !== undefined && options.propertyName !== undefined)
	    		throw "editInput ViewModel was passed both a value and a propertyName";

	    	this.bindingEl = options.bindingEl;
	    	this.model = vm.model;
	    	this.editEnabledHandler = function(eventOriginator){
	    		if(eventOriginator !== this.model()) this.onCancelEditClick();
	    		else this.editing(true);
	    	}.bind(this);
	    	
	    	App.Events.on('editEnabled', this.editEnabledHandler);

	    	ko.utils.domNodeDisposal.addDisposeCallback(this.bindingEl, function(){
	    		App.Events.off('editEnabled', this.editEnabledHandler);
	    	}.bind(this))

	    	this.canEdit = ko.observable(options.disable !== true);
	    	this.canSave = ko.observable(true);

	    	this.editing = ko.observable(options.editing || false);

			this.propertyName = options.propertyName;
			this.label = options.label || '';
			this.value = vm[this.propertyName] || options.value;
			
			this.originalValue = this.value.peek();

			this.type = options.type || 'input';
			
			this.inputValidation = options.inputValidation || options.propertyName || "error";
	    	this.labelValidation = options.labelValidation || options.propertyName || "error";
						
			this.save = options.save;
			this.delete = options.delete;
			this.cancel = options.cancel;
		},

		onDeleteClick: function(){
			if(this.delete) this.delete.apply(this, arguments);
		},

		// EDITING //
		onCancelEditClick: function(){
			this.value( this.originalValue );
			this.validations({});
			
			this.editing(false);	

			if(this.cancel) this.cancel.apply(arguments);
		},

		onEditClick: function(){
			App.Events.trigger('editEnabled');

			this.editing(true);
			this.originalValue = this.value.peek();
			
			$(this.bindingEl).find('input').focus();
		},

		onSaveClick: function(){
			var curVal = this.value.peek();
			if(!_.isEmpty(String(curVal)) && this.originalValue === curVal) {
				this.editing(false);
				return;
			}

			this.validations( this.model().validate() );
			
			if(this.model().isValid()){
				this.editing(false);
				this.save(this.propertyName, curVal, this.originalValue)
					.then(function(){
						this.originalValue = curVal;
						var validation, type;
						var message = 'Change Saved';
						// TODO: this isnt the right way to do this, 
						// it shoudl be passed in on the dom element binding
						if(this.propertyName === 'port'){
							message = 'Saved. Restart your client-server'
							type ='info';
						}

						validation = errorCtlr.getValidation(message, this.propertyName, type || 'success');
						this.validations(validation);	
					}.bind(this))
					.fail(function(){
						this.editing(true);

						var validation = errorCtlr.getValidation(message, this.propertyName);
						this.validations(validation);	
					}.bind(this));
			}
		}		
	});
})