'use strict';

define([
	'knockout', 

	'components/fileOverlay/viewModel',
	'template!components/fileOverlay/template.html' 
],
function(ko, vm, template){
	var tpl = $(template).html()
	
	ko.components.register('file-overlay', {
		viewModel: {
			createViewModel:function(params, config){
				$(config.element).addClass('file-overlay');

				var options = _.extend(params, { bindingEl: config.element });
				return new vm(options);
			}
		},
		template: tpl
	});
});