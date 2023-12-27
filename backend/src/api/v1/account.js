const express = require('express');
const passport = require('passport')
const router = express.Router();
const bcrypt = require('bcrypt');

const nodemailer = require('nodemailer')
const ObjectId = require('mongodb').ObjectId;

let smtpTransport = nodemailer.createTransport({
  pool: true,
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: "delta.homepage.verify",
    pass: "fcmwbzvtjyxofnmp",
  },
});

router.post('/login', (req, res, next) => {
	if(req.body.register) {

		bcrypt.hash(req.body.password, 10, async function(err, hash) {

			const user = {
				email: req.body.email,
				password: hash,
				accountActive: false // todo auth mail
			}

			await database.insertOne('users', user).catch(console.error);

			const mailOptions = {
				from: "delta.homepage.verify@gmail.com",
				to: req.body.email + req.body.domain, 
				subject: 'Verifikace účtu',
				html: '<a href="' + global.backendPublic + '/api/v1/account/verify/' + user._id.valueOf() + '">Klikni zde</a>'
			}
			smtpTransport.sendMail(mailOptions, function(error, response){
				if(error) {
					console.log(error);
				}
				console.log(response)
			});

		});

		res.status(200).redirect(global.frontendPublic + '/account')

	} else {
		passport.authenticate('local', {
			successRedirect: global.frontendPublic + '/account',
			failureRedirect: global.frontendPublic
		})(req, res, next)
	}
});

router.get('/verify/:id', async (req, res, next) => {
	console.log('verified', req.params.id)
	await database.updateOne('users', {_id: new ObjectId(req.params.id)}, {$set: {accountActive: true}})
	res.status(200).redirect(global.frontendPublic + '/account')
})

router.delete('/logout', (req, res, next) => {
	req.logOut(err => {
    	if (err) return next(err);
    	res.redirect(global.frontendPublic + '/account');
 	});
})

router.get('/authOk', async (req, res) => {
	const user = await req.user
	res.status(200).json({auth: req.isAuthenticated(), user: user});
})

module.exports = router;
