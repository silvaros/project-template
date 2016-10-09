'use strict';

define([
	'jquery',
	'underscore',
	'knockout',
	'knockback'
],
function($, _ , ko, kb){
	var VideoPlayerViewModel = kb.ViewModel.extend({
		constructor: function(options){
	    	if(!options.file) throw "VideoPlayer component was constructed without a file option";
			
			_.extend(this, options.file);
			
			var videoEls = $(options.bindingEl).find('video');
			this.videoEl = videoEls[0];
			
			this.VideoStateEnum = {
				Errored: { text:  'The video errored, click here to force it to try to reload', 
							icon:'fa fa-exclamation-circle', cls: 'errored', click: this.reloadVideo.bind(this) },
				Seeking: { text: 'Loading', icon:'fa fa-spinner fa-pulse', cls: 'loading', click: function(){} },
				Loading: { text: 'Loading', icon:'fa fa-spinner fa-pulse', cls: 'loading', click: function(){} },
				Stalled: { text: 'The video stalled. It may start again in a moment, if not click here to force it to resume.', 
							icon:'fa fa-info-circle', cls: 'stalled', click: this.reloadVideo.bind(this)},
				Play: { text: 'Play', icon:'fa fa-play', cls: 'play', click: function(){ this.videoEl.play() }.bind(this) } 
			}

			this.videoState = ko.observable(null);

			videoEls.on('canplaythrough', this.canPlayThroughHandler.bind(this));
			videoEls.on('error', this.errorHandler.bind(this));
			videoEls.on('loadstart', this.loadStartHandler.bind(this));
			videoEls.on('play', this.playHandler.bind(this));
			videoEls.on('playing', this.playingHandler.bind(this));
			videoEls.on('progress', this.progressHandler.bind(this));
			videoEls.on('seeking', this.seekingHandler.bind(this));
			videoEls.on('stalled', this.stalledHandler.bind(this));
	
			//	videoEls.on('loadeddata', this.loadedDataHandler.bind(this));
			videoEls.on('pause', this.pauseHandler.bind(this));
			
			videoEls.on('abort', function(){ console.log('abort') });
			videoEls.on('ended', function(){ console.log('ended') });
			videoEls.on('emptied', function(){ console.log('emptied') });
			
			// videoEls.on('seeked', function(){ console.log('seeked') });
			// videoEls.on('waiting', function(){ console.log('waiting') });
			// videoEls.on('suspend', function(){ console.log('suspend') });
			// videoEls.on('canplay', function(){ console.log('canplay') });

			ko.utils.domNodeDisposal.addDisposeCallback(this.videoEl, function(){
  	    		videoEls.off();
  	    		videoEls.attr('src', '');
   	    	}.bind(this))
	    },

	    canPlayThroughHandler: function(){
			if(this.videoState.peek() !== null )
	    		 this.videoState(this.VideoStateEnum.Play);

	    	console.log('canplaythrough');
	    },

	    errorHandler:function(){
	    	this.videoState(this.VideoStateEnum.Errored);
	    	console.log("error");
	    },
    	
    	// loadedDataHandler:function(){
    	// 	console.log("loaded data");
	    // },

	    loadStartHandler:function(){
	    	this.videoState(this.VideoStateEnum.Loading);
	    	console.log("load start");
	    },
	    
	    pauseHandler: function(){
	    	// keep the stalled or error banners is showing
	    	if( this.videoState.peek() !== this.VideoStateEnum.Stalled && 
	    		this.videoState.peek() !== this.VideoStateEnum.Errored &&
	    		this.videoState.peek() !== this.VideoStateEnum.Loading
	    	){
	    		this.videoState(this.VideoStateEnum.Play);
	    		return false;
	    	}
	    },

	    playAt: function(seekTo){
	    	this.videoState(this.VideoStateEnum.Loading);

	    	this.videoEl.load();
    		this.videoEl.currentTime = seekTo;
    		this.videoEl.play();
	    },

	    playHandler: function(e){
	    	// keep the stalled or error banners is showing
	    	if( this.videoState.peek() === this.VideoStateEnum.Stalled || 
	    		this.videoState.peek() === this.VideoStateEnum.Errored ||
	    		this.videoState.peek() === this.VideoStateEnum.Loading
	    	){
	    		this.videoEl.pause();
	    		return false;
	    	}
	    }, 

	    playingHandler: function(){
	    	if( this.videoState.peek() !== this.VideoStateEnum.Stalled && 
	    		this.videoState.peek() !== this.VideoStateEnum.Errored &&
	    		this.videoState.peek() !== this.VideoStateEnum.Loading
	    	){
	    		this.videoState(null);
	    	}

	    	console.log('playing');
	    }, 
		
	    progressHandler: function(){
	    	switch(this.videoState.peek()){
		    	case this.VideoStateEnum.Seeking:
		    		if(this.videoEl.paused){
		    			this.videoState(this.VideoStateEnum.Play);
		    		}
		    		break;
		    	case this.VideoStateEnum.Loading:
		    		if(!this.videoEl.paused){
		    			this.videoState(null);
		    		}
		    		break;
		    	// if the app is waiting to play the file
		    	case this.VideoStateEnum.Play:
		    		// do nothing
		    		break;
		    	// if the video had just stalled 
		    	case this.VideoStateEnum.Stalled:
	    			this.videoState(this.VideoStateEnum.Loading);
		    		break;
		    	default: 
		    		this.videoState(null);
		    	
		    }
	    	console.log('progress');
	    },

	    reloadVideo: function(){
	    	this.playAt(this.videoEl.currentTime);
	    },

	    seekingHandler: function(){
	    	if( this.videoState.peek() !== this.VideoStateEnum.Stalled && 
	    		this.videoState.peek() !== this.VideoStateEnum.Errored
	    	){
	    		this.videoState(this.VideoStateEnum.Seeking);
			}

			console.log('seeking');	
	    },

		stalledHandler: function(){
			console.log('stalled');
			this.videoState(this.VideoStateEnum.Stalled);
	    }
	});

	return VideoPlayerViewModel;
});