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
				role: "student",
				male: true,
				name: "",
				surname: "",
				bakalari_user: "",
				bakalari_pass: ""
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
			successRedirect: global.frontendPublic + (req.query.return || '/account'),
			failureRedirect: global.frontendPublic + (req.query.return || '/account')
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
    	res.redirect(global.frontendPublic + (req.query.return || '/account'));
 	});
})

router.get('/authOk', async (req, res) => {
	const user = await req.user
	res.status(200).json({auth: req.isAuthenticated(), user: user});
})

router.put('/accountInfo/update', global.isAuth, (req, res, next) => {
	database.updateOne('users', {_id: new ObjectId(req.user._id)}, {$set: {
		name: req.body.name,
		surname: req.body.surname,
		bakalari_user: req.body.bakalari_user,
		bakalari_pass: req.body.bakalari_pass // todo hash?
	}})

	res.redirect(global.frontendPublic + '/account')
})

router.put('/accountInfo/changePass', global.isAuth, async (req, res, next) => {
	if(await bcrypt.compare(req.body.oldpass, req.user.password)) {
		bcrypt.hash(req.body.newpass, 10, async function(err, hash) {
			database.updateOne('users', {_id: new ObjectId(req.user._id)}, {$set: { password: hash }})
		})
	}

	res.redirect(global.frontendPublic + '/account')
})

router.get('/accountInfo', global.isAuth, (req, res, next) => {

})

module.exports = router;
