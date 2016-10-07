'use strict';

define([
	'jquery',
	'knockout',
	'knockback',
	'bbv',
	'underscore',

	'utils/js/namespace'
],
function($, ko, kb, bbv, _ , nsUtils){
	function applyValidationToElement(el, validation, options){
		el = $(el);
				
		if(!validation){
			el.removeClass('validation-error validation-success validation-info');
			if(options.type === 'label') el.find('span').text('');
        }
		else {
			if(options.ninjaMode === true)
				el.show();

			el.addClass('validation-'+ (validation.type || 'error'));
					
			if(options.type === 'label')
				el.find('span').text(' ' + validation.message);
		}
	}

	function initElement(el, options){
		// icon first
		if(options.icon){
			var iconEl = $('<i />').addClass(options.icon);
			el.append(iconEl);
		}

		// always add the span if label
		if(options.type === 'label')
			el.append($('<span />'));

		if(!el.is('input'))
        	el.addClass('alert');	

    	//ninja mode - use display:none
    	if(options.ninjaMode === true) 
    		el.hide();
	}

	function getValidationObject(key, msg, type){
		// pretty simple, but let's leave this here incase we want to change it
		return { key: key, message: msg, type: type || 'error'};
	}

	function processBackboneModel(element, vm, options){
		var model = vm.model();
		// dont overwrite validate again
		if(!model.validate){
			// mix in our stuff over bbv
			_.extend(model, bbv.mixin);

			var bbvValidateFn = model.validate;

			model.validate = function(attrsObj){
				var backboneValidations = bbvValidateFn.apply(model, arguments);
				var finalValidations;
				
				delete model.validationError;
				
				// rewrite the backboneValidations to conform to the structure we want
				if(backboneValidations){
					finalValidations = {};
					for(var key in backboneValidations){
						// if attributes were passed in only use those
						if(!attrsObj || attrsObj[key] != undefined){
							finalValidations[key] = getValidationObject(key, backboneValidations[key]);
						}
					}
				}
				return finalValidations;
			}.bind(this)
		}

		var keys = options.selector;

		model.on('change', function(){
			var changedProperty = _.keys(model.changed)[0];
			// it looks like this fires for every change so there should only be 1 key in mode.changed
			if(_.isArray(keys)){
				var changedKeyIndex = keys.indexOf( changedProperty );
				if(changedKeyIndex > -1){
					// remove any keys we are checking
					var currentValidations = vm.validations.peek();
					if(currentValidations){
						for(var key in model.changed){
							delete currentValidations[key];
						}
					}

					var backboneValidations = model.validate(model.changed);
					vm.validations( _.extend({}, currentValidations, backboneValidations) );
				}
			}
			else if(_.isRegExp(keys)){
				debugger	
			}
		});
	
		model.on('invalid', function(model, validations){
			if(_.isArray(keys)){
				vm.validations(validations);
			}
			else if(_.isRegExp(keys)){
				debugger	
			}	
		});			
	}

	function processSelector(options){
		var selector;
		if(_.isEmpty(options)) selector = ['error'];
    	// if just a string we assume a property name, but put it in an array 
    	// so we only deal with arrays to simplify the workflow
    	else if(_.isString(options)){
    		selector = [options];
    	}
		else if(_.isArray(options)){
    		selector = options;
    	}
    	else if(_.isObject(options)){
    		if(_.isEmpty(options.selector)) 
    			selector = ['error'];
    		else if(_.isString(options.selector)) 
    			selector = [options.selector];
    		else if(_.isArray(options.selector)){
    			selector = options.selector;
    		}	
    	}

    	if(_.isString(options) || _.isArray(options)){
    		options = { selector: selector };
		}
		else {
			options.selector = selector;
		}
    	
    	return options;
	}

	/*  data-bind="valid: {
		    selector: {'str' || ['ary'] || /regex/} - indicates which property/ies this element will respond to
		    type: {string} - label (display messages), icon, input,
		    icon: {string} - (ususally fontawesome) class names to add
		    cls: {string} -  additional classes to add to the root element
	    }
	*/	
	ko.bindingHandlers.valid = {		
		init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {        	
        	var options = valueAccessor();
        	var el = $(element);

        	initElement(el, options);

			options = processSelector(options);
    	
        	// add a validations observable if none
        	if(!viewModel.validations) viewModel.validations = ko.observable({});
        	
        	// if kb, get the model
			if(viewModel instanceof kb.ViewModel && viewModel.model && viewModel.model() instanceof Backbone.Model )
				processBackboneModel(element, viewModel, options);
			
			function onAjaxError(model, res){
				var validations = nsUtils.lookUpValue(res, 'responseJSON.validations') || {};

				if(_.isArray(options.selector)){
					_.each(options.selector, function(key){
						var validation = validations[key];
						var oldVals = viewModel.validations();
						var newVals = _.extend(oldVals, validations);
						
						viewModel.validations(newVals);
					});
				}
				else if(_.isRegExp(options.selector)){
					debugger	
				}	
			}

			$(document).ajaxError(onAjaxError);

			ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
  				$(document).off('ajax', onAjaxError );
 	        });
		},

	    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
	    	var options = ko.unwrap(valueAccessor());
	    	options = processSelector(options);
        	
        	var validations = viewModel.validations();
    		
    		if(validations)
	    		_.each(options.selector, function(selectorString, key){
		    		var valid = validations[selectorString];
		    		applyValidationToElement(element, valid, options);
		    	});
		}
	}
});