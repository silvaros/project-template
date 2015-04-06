define([
	'codeGen'
],
function(codeGen){
	return function(app){
		// serve an empty page that just loads the browserify bundle
		app.route('/api/code/:userId/:gymId').get(function(req, res) {
		    var userId = req.params.userId;
		    var gymId = req.params.gymId;
			var code = codeGen.generateGymPassCode(userId, gymId);
			
		    res.status(200).send(code);
		});
	}
});