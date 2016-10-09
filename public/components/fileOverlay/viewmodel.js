'use strict';

define([
	'jquery',
	'knockout',
	'knockback',
    'components/videoPlayer/binding',
    'components/fileInfo/binding'
],
function($, ko, kb){
    var OverlayStates = {
        Play: 'file-player',
        Info: 'file-info',
        Tags: 'file-tags',
        Dir: 'file-dir'
    };

    var FileOverlayViewModel = kb.ViewModel.extend({
        constructor: function(params){
            this.file = params.file.peek();
            this.name = this.file.name.peek();
            this.isDir = this.file.isDir.peek();
            this.show = params.show || ko.observable(false);

            this.OverlayStates = OverlayStates;
            this.overlayState = ko.observable(params.state || this.isDir ? OverlayStates.Dir : OverlayStates.Play);
        },
        
        setOverlayState: function(state){
            if(state && state !== this.overlayState.peek()){
                this.overlayState(state);
            }
        },

        onCloseClick: function(){
        	this.show(false);
        }
    });

    App.Utils.ns(App, 'Core.ViewModels.FileOverlayViewModel', FileOverlayViewModel);
    return FileOverlayViewModel;
});