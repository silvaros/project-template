define(function(){
	return {
		generateGymPassCode: function(userId, gymId){
			var timestamp = new Date().toISOString();
			return gymId + "-" + userId + "-" + timestamp;
		}
	}
});