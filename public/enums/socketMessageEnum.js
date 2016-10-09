'use strict';

define(function(){
 	return  {
		// Reserved
		connection: 			'connection',
		disconnect: 			'disconnect',
		error: 					'error',	
		
		// Custom
		connectionComplete: 	'CC',
		fileStreamRequest:		'FSRq',
		fileStreamResponse:		'FSRs',
		clientInitComplete: 	'CIC',
		peerDisconnected: 		'PD',
		sendUsers: 				'SU',

		// API
		Search_GetMatchingFiles: 'Search_GetMatchingFiles',
		Search_GetMatchingTags: 'Search_GetMatchingTags'
	}
});