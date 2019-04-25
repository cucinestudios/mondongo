const User = require('../models/user');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const mongoose = require('../config/mongoose');
const env = require('simpledot');

module.exports["registerUser"] = async (req,res) => {
	try {
		let fields = {
			email: req.body.email,
			name: req.body.name,
			lastname: req.body.lastname,
			password: req.body.password
		}
		//Check for profile picture
		if (req.files.picture) {
			const tmppath = req.files.picture.path;
			const tmpname = req.files.picture.name;    			
			const sourcepath = path.resolve(__dirname, '../../', './mondongo/public/uploads/' + tmpname);
			const targetpath = path.resolve(__dirname, '../../', './mondongo/public/uploads/');	

			fs.rename(tmppath, sourcepath, (err) => {
				if (err) {
					console.log("error");
				} else {
					fields = {
						email: req.body.email,
						name: req.body.name,
						lastname: req.body.lastname,
						password: req.body.password,
						picture: tmpname
					}  
				}
			});
		}

		const newUser = new User(fields);
		const user = await newUser.save()
		const userId = {id: user._id, salt: user.salt};
		const token = jwt.sign({userId}, env.SECRET_HASH);
		const data = {
			user: user,
			token: token
		}
		res.json({
			status: 1,
			message: "user added",
			data: data
		});
	} catch(error) {
		res.json({
			status: 0,
			message: "An error has ocurred!",
			error
		});
	}
}

module.exports["authenticateUser"] = async (req,res) => {
	try {
		const user = await User.findOne({email: req.body.email})
		if (!user || !user.authenticate(req.body.password)) {
			res.json({
				status: 0,
				message: "wrong credentials"
			})
		} else {
			const userId = {id: user._id, salt: user.salt};
			const token = jwt.sign({userId}, env.SECRET_HASH);
			const data = {
				user: user,
				token: token
			}            
			res.json({
				status: 1,
				message: "login sucessfull",
				data: data
			})
		}
	} catch (error) {
		res.json({
			status: 0,
			message: "An error has ocurred!",
			error
		})
	}
}
