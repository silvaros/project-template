require([
    'knockout',
    'text!modules/index/templates/login.html',

    'modules/index/viewmodels/loginViewModel'
], 
function(ko, loginHtml, loginVM){
    window.Gymme = {};

    var Router = Backbone.Router.extend({
        routes: {
            "": "index",
            "about": "about"
        },

        about: function(){
            $('section.content').html('<hi>about us</h1>');
        },

        index: function(){
            $('section.content').html(loginHtml);
            ko.applyBindings(loginVM, $('section.content').children()[0]);
        }
    });

    Gymme.Router = new Router();
    Backbone.history.start();
});