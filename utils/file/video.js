'use strict';

define(function(){
	return { 
		mimeTypes:{
			"swf": "application/x-shockwave-flash",
			"flv": "video/x-flv",
			"mpeg": "video/mpeg",
			"mpg": "video/mpeg",
			"mpv2": "video/mpeg",
			"mp2": "video/mpeg",
			"ogg": "video/ogg"
		},
		getExt: function(name){
			return name.split('.').pop();
		},
		getExtMime: function(ext){
			//if ext is actually a full path with an extentison
			if(ext.indexOf('.')) ext = this.getExt(ext);

			return this.mimeTypes[ext] || 'video/mp4';
		}
	}
});
