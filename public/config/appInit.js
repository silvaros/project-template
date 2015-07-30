require([
    'modules/core/controllers/routeController'
], 
function(routeController){
    window.App = {};
    routeController.init();
});