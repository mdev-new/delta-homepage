const express = require('express');
const passport = require('passport')
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

// todo kazdych 24h poslat mail nevyresenym prirazenym ticketum

// todo check if authenticated
router.post('/post', global.isAuth, async (req, res) => {
	global.database.insertOne('problems', {
		problem: req.body.problem,
		place: req.body.place,
		reporter: req.user.email,
		assigned: req.body.assignee,
		datetime: new Date().toString(),
		liked_by: [],
		solved: false
	}).catch(console.error);

	const mailOptions = {
		from: `${process.env.MAIL_USERNAME}@${process.env.MAIL_DOMAIN}`,
		to: req.body.assignee, // + "@delta-skola.cz"
		subject: 'Nový problém na Helpdesku',
		html: `Problém: <b>${req.body.problem}</b> v umístění <b>${req.body.place}</b>. Nahlášeno uživatelem <i>${req.user.email}</i> a <b>vy</b> jste byli přiděleni. <a href="${global.frontendPublic}">Přejít do portálu Delta Homepage</a>`
	}
	global.smtpTransport.sendMail(mailOptions, function(error, response){
		error && console.log(error)
	});

	res.status(200).redirect(global.frontendPublic)
})

router.post('/update', global.isAuth_headless, async (req, res) => {
	console.log(req.body.action)
	const action = JSON.parse(req.body.action)
	console.log(action)
	if(action.variant === 'souhlas') {
		global.database.updateOne('problems', {_id: new ObjectId(req.body.id)}, {$push: {liked_by: req.user.email}})
	} else if(action.variant === 'vyreseno') { // todo check perms

		const problem = await global.database.findOne('problems', {_id: new ObjectId(action.id)})

		console.log(problem, problem.assigned, req.user.email, problem.assigned == req.user.email)
		if(problem.assigned == req.user.email) {
			global.database.updateOne('problems', problem, {$set: {solved: true}})

			const mailOptions = {
				from: `${process.env.MAIL_USERNAME}@${process.env.MAIL_DOMAIN}`,
				to: problem.reporter,
				subject: 'Helpdesk',
				html: `Váš problém <b>${problem.problem}</b> na Helpdesku nahlášený ${problem.datetime} byl označen jako vyřešený. <a href="${global.frontendPublic}">Přejít do portálu Delta Homepage</a>`
			}
			global.smtpTransport.sendMail(mailOptions, function(error, response){
				error && console.log(error)
			});
		}
	}

	res.redirect(global.frontendPublic)
})

router.get('/posts', async (req, res) => {
	res.status(200).json(await global.database.queryAll('problems'))
})

module.exports = router;
