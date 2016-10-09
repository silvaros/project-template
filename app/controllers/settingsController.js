'use strict';

define([
	'underscore', 'config', 'async', 'fs', 'path', 'mongoose',
	'utils/js/namespace', 'utils/js/crypto',
	'public/controllers/errorsController',
	'app/controllers/responseController',

	'public/enums/socketMessageEnum'
],
function( _ ,config, async, fs, path, mongoose, nsUtil, cryptoUtil, errorsCtlr, responseCtlr, smEnum){
	var UserModel = mongoose.model('User');

	return {
		getUserSettings: function(req, res){
			UserModel.findOne({ userName: req.user.userName }, function(err, data){
				if(err){
					return res.status(400).json( responseCtlr.createErrorResponse(errorsCtlr.getValidation(err)) );
				}

				var dataObj = data.$toObject();
				var returnData = dataObj.settings;
				returnData.password = cryptoUtil.decrypt(dataObj.password);

				return res.status(200).json(returnData);
			});
		}
	}
});