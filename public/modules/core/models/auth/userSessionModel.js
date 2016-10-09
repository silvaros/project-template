'use strict';

define([
    'backbone', 'bbr', 'knockback'
 ],
function (Backbone, bbr, kb) {
    var SessionModel = Backbone.RelationalModel.extend({
        idAttribute: '_id',
        url: '/api/me',
        
        defaults: {
            userName: ''
        },

        initialize: function(){
            this.userName = kb.observable(this, 'userName');
            this.role = kb.observable(this, 'role');

            this.isAuthorized = ko.computed(function(){
                return !!this.userName();
            },this);

            this.isVerified = ko.computed(function(){
                return this.role() !== "pending";
            },this);
        },

        login: function(user, pass, callback){
            return $.ajax({
                method: 'POST',
                contentType: 'application/json',
                url: '/api/login',
                data: JSON.stringify({
                    'password': pass,
                    'userName': user
                }),
                success: function(user, statusMsg, xhr){
                    this.set(user);
                    if(callback) callback(user, xhr);
                }.bind(this),
                error: function(){
                    debugger
                }
            });
        },

        logout: function(callback){
            $.ajax({
                url: '/api/logout',
                success: function(){
                    this.clear();
                    if(callback) callback();
                }.bind(this)
            });
        }
    });

    return SessionModel;
});
