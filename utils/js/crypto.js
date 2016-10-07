'use strict';

define([
	'crypto'
],
function(crypto){
	var key = '4321RewqFdsa';
	return {
		encrypt: function(text){
		  var cipher = crypto.createCipher('aes-256-cbc', key);
		  var crypted = cipher.update(text,'utf8','hex');
		  crypted += cipher.final('hex');
		  return crypted;
		},

		decrypt: function(text){
		  var decipher = crypto.createDecipher('aes-256-cbc', key);
		  var dec = decipher.update(text,'hex','utf8');
		  dec += decipher.final('utf8');
		  return dec;
		}
	}
});