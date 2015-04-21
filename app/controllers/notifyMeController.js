define([
	'fs', 'path', 'os'
], 
function(fs, path, os){
	var listFilePath = 'app/data/notifyList.json';

	return {
		newNotifyMe: function(req, res) {
			// not sure y responseJSON is getting in the req object
			delete req.body.responseJSON;

			dataToSave = _.clone(req.body);
			// if blank dont save to file
			dataToSave.age != "" || delete dataToSave.age;
			dataToSave.zipcode != "" || delete dataToSave.zipcode;

			// add time stamp
			dataToSave.timestamp = new Date().getTime();
			// capture ip
			dataToSave.ip = req.ip.substr(req.ip.lastIndexOf(':')+1);
			
			fs.appendFile(path.resolve( listFilePath ), (JSON.stringify(dataToSave) + os.EOL), function(err){
				if(err){
					res.status(400).send({ responseJSON: { status: 400, msg: err} });
				}
				else
					res.status(200).send({ responseJSON: { status: 200, msg: "We got it, thanks for signing up!"} });
			});
		}
	}
})