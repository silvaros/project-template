require([
    'knockout',
    'knockback'
], 
function(ko, kb){
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
                    'text!modules/core/templates/notifyMe.html',
                    'modules/core/models/notifyMeModel',
                    'modules/core/viewmodels/notifyMeViewModel'
                ], function(notifyMeHtml, NotifyMeModel, NotifyMeViewModel){
                    appendAndApply( notifyMeHtml, new NotifyMeViewModel(new NotifyMeModel()) );
                });
            },

            "login": function(){
                require([
                    'text!modules/core/templates/login.html',
                    'modules/core/viewmodels/loginViewModel'
                ], appendAndApply);
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
        }
    });

    Gymme.Router = new Router();
    Backbone.history.start();
});