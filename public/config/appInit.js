 
var vm = {
	getCode: function(){
		$.ajax({
			dataType: json, 
			url: '/api/abc/123'
		});	
	}
}

var Router = Backbone.Router.extend({
    routes: {
        "": "index"
    },

    index: function(){
    	$('section .content').append()
    }
});


var router = new Router();
Backbone.history.start();
