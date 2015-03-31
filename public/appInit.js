 
var Router = Backbone.Router.extend({
    routes: {
        "": "index"
    },

    index: function(){
    	console.log("in index")	
    }
});


var router = new Router();
Backbone.history.start();
