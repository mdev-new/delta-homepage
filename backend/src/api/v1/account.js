const express = require('express');
const passport = require('passport')
const router = express.Router();
const bcrypt = require('bcrypt');

const ObjectId = require('mongodb').ObjectId;

router.post('/login', (req, res, next) => {
	if(req.body.register) {

		bcrypt.hash(req.body.password, 10, async function(err, hash) {

			const user = {
				email: req.body.email + req.body.domain,
				password: hash,
				accountActive: false,
				role: "student"
			}

			await database.insertOne('users', user).catch(console.error);

			const mailOptions = {
				from: `${process.env.MAIL_USERNAME}@${process.env.MAIL_DOMAIN}`,
				to: req.body.email + req.body.domain, 
				subject: 'Verifikace účtu',
				html: 'Pro verifikaci účtu na Delta Homepage <a href="' + global.backendPublic + '/api/v1/account/verify/' + user._id.valueOf() + '">klikněte zde</a>.'
			}
			global.smtpTransport.sendMail(mailOptions, function(error, response){
				if(error) {
					console.log(error);
				}
			});

		});

		res.status(200).redirect(global.frontendPublic + '/')

	} else {
		passport.authenticate('local', {
			successRedirect: global.frontendPublic + '/',
			failureRedirect: global.frontendPublic + '/account'
		})(req, res, next)
	}
});

router.get('/verify/:id', async (req, res, next) => {
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
