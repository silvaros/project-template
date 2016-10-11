'use strict';

define([
	'socket.io-stream',

	'public/enums/socketMessageEnum',
	'public/controllers/errorsController'
],
function(ss, smEnums, errorsCtlr){
	return function(app){
		return {
			onVideoRequested: function(req, res){
				return res.status(200).json({});
			}
		}
	}
})