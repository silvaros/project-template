require([
    'knockout'
], 
function(ko){
    window.Gymme = {};

    function appendAndApply(html, vm){
        var content = $('section.content');

        ko.cleanNode( content[0] );
        content.html( html );
        
        if(vm != undefined){
            var fragmentRoot = content.children()[0];
            ko.applyBindings(vm, fragmentRoot);
        }
    }

    var Router = Backbone.Router.extend({
        routes: {
            "": function(){
                require([
                    'text!modules/index/templates/login.html',
                    'modules/index/viewmodels/loginViewModel'
                ],
                function(loginHtml, loginVM){
                    appendAndApply(loginHtml, loginVM);   
                });            
            },

            "about":function(){
            
            },
            
            "list":  function(){
                require([
                    'text!modules/search/templates/search.html',
                    'modules/search/viewmodels/searchViewModel'
                ],
                function(searchHtml, searchVM){
                    appendAndApply(searchHtml, searchVM);   
                });        
            }
        },

        route: function(route){
            debugger;
        }
    });

    Gymme.Router = new Router();
    Backbone.history.start();
});