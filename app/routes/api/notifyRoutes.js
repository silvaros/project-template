define(function(){
	return function(app){
		// serve an empty page that just loads the browserify bundle
		app.route('/api/notifyme').post(function(req, res) {
		    res.status(200).send({ responseJSON: { status: 200, msg: "We got it, thanks for signing up!"} });
		});
	}
});