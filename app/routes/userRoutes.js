define([
	'codeGen'
],
function(codeGen){
	return function(app){
		// serve an empty page that just loads the browserify bundle
		app.route('/code/:userId/:gymId').get(function(req, res) {
		    var userId = req.params.userId;
		    var gymId = req.params.gymId;
			//var code = codeGenerator.generateGymPassCode (userId, gymId);
			//console.log(code);

		    res.send({ /*code: code*/ });
		});
	}
});