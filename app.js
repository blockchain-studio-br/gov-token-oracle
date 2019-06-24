var http = require('http');
var app = require('./config/express');
var port = 3000;

http
	.createServer(app)
	.listen(port, () => {
	    console.log("Server Initialized on port " + port);
	});