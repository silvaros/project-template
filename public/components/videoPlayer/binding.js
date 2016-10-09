'use strict';

define([
	'knockout', 

	'components/videoPlayer/viewModel',
	'text!components/videoPlayer/template.html' 
],
function(ko, vm, template){
	ko.components.register('video-player', {
		viewModel: {
			createViewModel:function(params, config){
				var options = _.extend(params, { bindingEl: config.element });
				return new vm(options);
			}
		},
		template: $(template).html()
	});
});