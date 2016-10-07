'use strict';

define([
	'jquery',
	'knockout',
	'knockback'
],
function($, ko, kb){
	return {
		menuShowing: ko.observable(false),
        userName: kb.observable(App.User, 'userName'),
        
        onLogoutClick: function(){
            App.User.logout(function(){
                App.goTo('/login');
            });
        },

        toggleMenu: function(){
            this.menuShowing( !this.menuShowing.peek() );
        }
	}
});