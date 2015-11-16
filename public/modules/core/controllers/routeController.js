define([
    'backbone',
	'knockout'
],
function(Backbone, ko){
    var routerInstance;
    var defaultAuth = ['user', 'admin'];

    // if null all roles can access route, including those not logged in
    var publicRoutes = ['','notFound','notAuth','verifySignup'];

    var restrictedRoutes = {
        'accounts': ['admin']
    }

    function authRoute(route, role){
        var authed = false;
        var privateRouteAuth = restrictedRoutes[route];
        
        // if it is public access
        if(publicRoutes.indexOf(route) > -1) authed = true;
        // if the route is restricted and not in restrictedRoutes, check it against the defaultAuth
        else if(!privateRouteAuth){
            authed = defaultAuth.indexOf(role) > -1;
        }
        // if an exception was made for this route, we dont check against defaultAuth
        else {
            // if it is something other than public access
            if(privateRouteAuth.indexOf(role) > -1) authed = true;
        }

        return authed;
    }

	function insertAndApply(html, vm, node){
        var content = $(node).length > 0 ? $(node): $('section.app-content');

        ko.cleanNode( content[0] );
        content.empty();
        content.append( $(html).clone() );
        
        var fragmentRoot = content.children()[0];
        ko.applyBindings(vm || {}, fragmentRoot || content[0]);
    }

    function init(){
        if(routerInstance) return routerInstance;

        // if no router has been created
        var router = Backbone.Router.extend({
            routes: {
                '(/)': index,
                'verifySignup(/)': verifySignup,
                'verifySignup/:token(/)': verifySignup,
                'notAuth': notAuth,
                '*notfound': notFound
            }
        });

        var oldLoadUrl = Backbone.history.loadUrl;
        Backbone.history.loadUrl = function(fragment) {
            fragment = fragment || this.getFragment(fragment);

            // for now we'll just check the first / after the root, if none jsut use the fragment
            var slashIndex = fragment.indexOf('/');
            var fragmentRoot = slashIndex > -1 ? fragment.substr(0, slashIndex) : fragment;

            var role = App.Session.get('role');            
            // any route (except verifySignup) will go to verifySignup if user has not verified his account
            if(role === 'pending' &&  fragmentRoot !== 'verifySignup'){
                App.goTo("verifySignup");
                return false;
            }

            // if undefined role, user not loggged 
            if(!authRoute(fragmentRoot, role)){
                // route to 403
                App.goTo('notAuth');
                return false;
            }
            else {
                return oldLoadUrl.apply(this, arguments);
            }
        };

        // override execute so we can pass what we like to the functions in routeController
        router.execute = function(callback, args) {
            var callbackArgs = {args: args, data: App.Router.RouteData};

            if(callback){
                callback.call(this, callbackArgs);
           }
        };

        routerInstance = new router();

        return routerInstance;
    }

    function initHeader(){        
        require([
            'template!modules/core/templates/header.html',
            'modules/core/viewmodels/headerViewModel'
        ],
        function(html, vm){
            insertAndApply(html, vm, $('section.app-header')[0]);
        });
    }

    // ** Route Functions  **//

    function index(){
        if(!App.Session.isAuthorized()){
            require([
                'template!modules/core/templates/auth/signup.html',
                'modules/core/viewmodels/auth/signupViewModel'
            ], function(SignupHtml, SignupViewModel, SignupModel){
                   insertAndApply(SignupHtml, new SignupViewModel());
            });
        }
        else {
            App.goTo('users/' + App.Session.get('userName') + '/collections');
        }   
    }

    function verifySignup(token){
        require([
            'template!modules/core/templates/auth/verifySignup.html',
            'modules/core/viewmodels/auth/verifySignupViewModel'
        ], function(VerifySignupHtml, VerifySignupViewModel){
            insertAndApply( VerifySignupHtml, new VerifySignupViewModel(token));
        }); 
    };

    function notAuth(){
        require([ 'template!modules/core/templates/auth/notAuth.html' ], insertAndApply); 
    }

    function notFound(){
        debugger
    }
    
    return {
        //'authRoute': authRoute,
        'init': init,
        'initHeader': initHeader,
        //'insertAndApply': insertAndApply,
	}
});
