'use strict';

define([
	'socket.io-stream',

	'../../public/enums/socketMessageEnum',
	'public/controllers/errorsController'
],
function(ss, smEnums, errorsCtlr){
	return function(app){
		return {
			onVideoRequested: function(req, res){
				// get the users socket based on userName
				var client = app.clients[ req.params.userName ];
				if(!client){ 
					return res.status(400).json( errorsCtlr.getValidation('User ('+ req.params.userName +') not found') );
				} 
				var socket = client.socket;
				var start = 0;
				var end, chunksize;

				if (req.headers['range']) {
					var range = req.headers.range,
					parts = range.replace(/bytes=/, "").split("-"),
					partialstart = parts[0],
					partialend = parts[1];

					start = parseInt(partialstart, 10);
					end = partialend ? parseInt(partialend, 10) : undefined;
				}

				// set up the event to listen for the client server's response
				ss(socket).once( smEnums.fileStreamResponse, function(stream, info){
					if(!stream){
						console.log('server.routes.fileStreamResponse was passed an undefined stream');
						return res.status(400).json( errorsCtlr.getValidation( 'server.routes.fileStreamResponse was passed an undefined stream' ) );
					}

					if(req.headers['range']){
						var contentRange = 'bytes ' + info.start + '-' + info.end + '/' + info.size;

						res.writeHead(206, {
							'Content-Range': contentRange,
							'Accept-Ranges': 'bytes',
							'Content-Length': info.chunkSize,
							'Content-Type': info.mime
						});
					}
					else {
						res.writeHead(200, { 'Content-Length': info.size, 'Content-Type': info.mime });
					}
				
					stream.pipe(res);
				});
			
				// tell the client-server we want some file data
				socket.emit( smEnums.fileStreamRequest, {
					'collectionName': req.params.collectionName,
					'uuid': req.params.uuid,
					'start': start,
					'end': end
				});
			}
		}
	}
})