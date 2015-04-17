define([
	'fs', 'path', 'os'
], 
function(fs, path, os){
	var listFilePath = 'app/data/notifyList.json';

	return {
		newNotifyMe: function(req, res) {
			// not sure y responseJSON is getting in the req object
			delete req.body.responseJSON;

			// if blank dont save to file
			req.body.age != "" || delete req.body.age;
			req.body.zipCode != "" || delete req.body.zipCode;

			var dataToAdd = JSON.stringify(req.body);

			fs.appendFile(path.resolve( listFilePath ), (dataToAdd + os.EOL), function(err){
				if(err){
					res.status(400).send({ responseJSON: { status: 400, msg: err} });
				}
				else
					res.status(200).send({ responseJSON: { status: 200, msg: "We got it, thanks for signing up!"} });
			});
		}
	}
})