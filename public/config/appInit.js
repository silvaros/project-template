 
var vm = {
	getCode: function(){
		return $.ajax({
			//dataType: 'json', 
			url: '/api/code/abc/123'
		});	
	}
}

var Router = Backbone.Router.extend({
    routes: {
        "": "index"
    },

    index: function(){
    	vm.getCode().then(function(code){
       		$('section.content').append('<hi>' + code + '</h1>');
    	});
    }
});


var router = new Router();
Backbone.history.start();
