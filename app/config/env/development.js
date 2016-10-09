define(function(){
	var ip = 'www.xyz.com';
	var port = 4001;

 	return { 
 		port: port,
		assets: {
			css: [ 
				'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',
				'public/css/app.css'
			],
			js: [
				// for things not loaded by require on the client
				'public/lib/requirejs/require.js',
				'public/config/requireInit.js',
				'public/config/appInit.js',

				'public/lib/jquery/dist/jquery.js',
				'public/lib/bootstrap/dist/js/bootstrap.js'
			]
		},
		db: {
			path: 'mongodb://localhost/projectName-dev',
			sessionSecret: 'MEAN',
			sessionCollection: 'sessionName'
		},
		
		auth: {
			// facebook: {
			// 	clientID: process.env.FACEBOOK_ID || 'APP_ID',
			// 	clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
			// 	callbackURL: 'http://'+ ip + ':'+ port + '/auth/facebook/callback'
			// },
			// twitter: {
			// 	clientID: process.env.TWITTER_KEY || 'QL1hXS3rV2o1h41WCk64tAUPp',
			// 	clientSecret: process.env.TWITTER_SECRET || 'u6UQfthiDPZapK2hbo3Q11UIeyfs8EvrkmVkqv5LZStullv8DJ',
			// 	callbackURL: 'http://'+ ip + ':'+ port + '/auth/twitter/callback'
			// },
			// google: {
			// 	clientID: process.env.GOOGLE_ID || 'APP_ID',
			// 	clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
			// 	callbackURL: 'http://'+ ip + ':'+ port + '/auth/google/callback'
			// },
			// linkedin: {
			// 	clientID: process.env.LINKEDIN_ID || 'APP_ID',
			// 	clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
			// 	callbackURL: 'http://'+ ip + ':'+ port + '/auth/linkedin/callback'
			// },
			// github: {
			// 	clientID: process.env.GITHUB_ID || 'APP_ID',
			// 	clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
			// 	callbackURL: 'http://'+ ip + ':'+ port + '/auth/github/callback'
			// }
		},
		mailer: {
			// NOTE: this must be set for the system to send emails.
			from: process.env.MAILER_FROM || 'email@outlook.com',
			options: {
				host: 'smtp-mail.outlook.com',
				service: process.env.MAILER_SERVICE_PROVIDER || 'outlook',
				auth: {
					user: process.env.MAILER_EMAIL_ID || 'email@outlook.com',
					pass: process.env.MAILER_PASSWORD || 'password'
				}
			}
		}
	}
});