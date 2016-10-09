'use strict';

define([
	'jquery',
	'underscore',
	'knockout',
	'knockback'
],
function($, _ , ko, kb){
	var ContentItemCard = kb.ViewModel.extend({
		constructor: function(options){
	    	if(!options.contentItem) throw "ContentItemCard component was constructed without a contentItem option";
			
			_.extend(this, options.contentItem);

			this.selectedFile = options.selectedFile;
			
			this.selected = ko.computed(function(){
				return (this.selectedFile() === this);

			}, this);
	    },

	    rootCSS: function(){
	    	var selected = this.isDir.peek() ? (this.selected() && !this.collapsed()) : this.selected();

	    	return {
	    		selected: selected, 
				dir: this.isDir(),
				file: !this.isDir()
			}
	    }
	});

	return ContentItemCard;
});