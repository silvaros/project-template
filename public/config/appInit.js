'use strict';

// started with global utils
require([
    'utils/js/namespace',
    'modules/core/models/auth/userSessionModel',
    'controllers/routeController'
], 
function(nsUtils, UserSessionModel, routeController){
    window.App = { 
        Utils: nsUtils
    };

    App.Router = routeController.init();
    App.User = new UserSessionModel();
    App.Events = Backbone.Events;

    // this is used to get a handler for an event that causes navigvation
    App.goToFn = function(urlFragment, options){
        if(!options) options = {};

        return function(vm, e){    
            App.Router.RouteData = options.data;
            App.Router.navigate(urlFragment, {trigger: options.trigger !== false});
        }
    };

    // this is used when we want to actually navigate
    App.goTo = function(urlFragment, options){
        var fn = App.goToFn(urlFragment, options);
        fn.call();
    };

    // redirect on 401
    $(document).ajaxError(function (event, xhr, ajaxSettings, thrownError) {
        if (xhr.status == "401") {
           App.User.clear();
           App.goTo('login');
        }
    });

    App.User.fetch().then(function(){
       routeController.initHeader();

       Backbone.history.start({pushState: true});
    });
});

