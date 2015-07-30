define([
    'backbone',
    'knockout'
], 
function(Backbone, ko){
    function appendAndApply(html, vm, node){
        var content = $(node).length > 0 ? $(node): $('section.content');

        ko.cleanNode( content[0] );
        content.empty();        
        
        // using !text instead of !template return a string
        if(!(html instanceof jQuery)){
            html = $(html);
        }
    
        // dont want to pass a ref to the original
        content.html( html.clone());
        
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
            }
        }
    });

    return {
        'init': function(){
            App.Router = new Router();
            Backbone.history.start({pushState: true});        
        }
    }   
});