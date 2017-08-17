	var express = require('express');
	const router = express.Router();	
	const auth = require('./helpers/auth.js');
	
	//Import Controllers	
	var generalCtrl = require('./controllers/generalController');
	var userCtrl = require('./controllers/userController');

	
	router.route('/').get(generalCtrl.getHome);	

	//User controllers
	router.route('/register').post(userCtrl.registerUser);
	router.route('/login').post(userCtrl.authenticateUser);	
	router.post('/private', auth, generalCtrl.getPrivatePage);	

	module.exports = router;	
