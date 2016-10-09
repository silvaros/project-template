'use strict';

define([
	'knockout', 
 
	'components/contentItemCard/viewModel',
	'text!components/contentItemCard/template.html'
],
function(ko, vm, template){
	ko.components.register('content-item-card', {
		viewModel: {
			createViewModel:function(params, config){
				var options = _.extend(params, { bindingEl: config.element });
				return new vm(options);
			}
		},
		template: $(template).html()
	});
});