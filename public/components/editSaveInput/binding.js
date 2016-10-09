'use strict';

define([
	'knockout', 

	'template!components/editSaveInput/template.html', 
	'components/editSaveInput/viewModel'
],
function(ko, editSaveInputHTML, EditSaveInputViewModel){
	ko.bindingHandlers.editSaveInput = {
	    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        	return ko.bindingHandlers.template.init.apply(this, [element, function(){return { name: 'edit-save-input'}} ]);
	    },
	    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
	        var options = ko.unwrap(valueAccessor());
			options = _.extend({bindingEl: element}, options);
        	
			var vm = new EditSaveInputViewModel(viewModel, options);

			$(element).empty();	
	        ko.bindingHandlers['template'].update.apply(this, [element, function () { return { name: 'edit-save-input', data: vm } }, allBindings, viewModel, bindingContext]);    
	    	
	    	// by default make room for buttons
	    	if(options.addons !== false) 
	    		$(element).find('.validation-input-bottom').addClass('with-addon');
	    }
	}
});