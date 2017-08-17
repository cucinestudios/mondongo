	const express = require('express');
	const mongoose = require('mongoose');
	const app = express ();	
	const bodyParser = require('body-parser');
	const multipart = require('connect-multiparty');
	//if you want to solve cross origins issues uncomment the line below
	//const cors = require('cors');

	//Server general config
	app.use(multipart());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	//if you want to solve cross origins issues uncomment the line below
	//app.use(cors());

	//Define app routing
	var routes = require('./routes');
	app.use('/api', routes);	
	
	app.use('/public', express.static(__dirname + '/public'));

	//Start server
	app.listen (3000, function (){
		console.log('app runing on port 3000! ');
	});




