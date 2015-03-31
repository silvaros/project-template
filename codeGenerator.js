'use strict';

exports.generateGymPassCode = function (userId, gymId){
	var timestamp = new Date().toISOString();
	return gymId + "-" + userId + "-" + timestamp;
}
