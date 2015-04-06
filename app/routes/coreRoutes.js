define(function(){
	return function(app){
		// serve an empty page that just loads the browserify bundle
		app.route('/').get(function(req, res) {
		    res.render('index');
		});
	}
});