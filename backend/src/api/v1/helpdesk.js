const express = require('express');
const passport = require('passport')
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const cron = require('node-cron');

const Problem = require('./../../models/helpdesk_post.js')

// 1. den v tydnu 8:00
cron.schedule('0 0 8 * * 1', async () => {

	Problems.find().then(problems => problems.forEach(p => {
		const helpdeskAlert = {
			from: `${process.env.MAIL_USERNAME}@${process.env.MAIL_DOMAIN}`,
			to: p.assignee,
			subject: 'Neuzavreny problem na helpdesku - pravidelne upozorneni',
			html: `Problem ${p.text} v umisteni ${p.place} nahlaseny uzivatelem <i>${p.reporter}</i> z ${p.datetime}. <a href="${global.frontendPublic}">Přejít do portálu Delta Homepage</a>`
		}

		global.smtpTransport.sendMail(helpdeskAlert, (error, info) => {
			error && console.log(error)
		});
	}))
});

// todo check if authenticated
router.post('/post', global.isAuth, async (req, res) => {
	const date = new Date();
	const problem = new Problem({
		problem: req.body.problem,
		place: req.body.place,
		reporter: req.user.email,
		assigned: req.body.assignee,
		datetime: `${date.getDate()}.${date.getMonth() + 1}. ${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`,
		liked_by: [],
		status: "unsolved",
		type: req.body.type
	});

	problem.save();

	const mailOptions = {
		from: `${process.env.MAIL_USERNAME}@${process.env.MAIL_DOMAIN}`,
		to: req.body.assignee, // + "@delta-skola.cz"
		subject: 'Nový problém na Helpdesku',
		html: `Problém: <b>${req.body.problem}</b> v umístění <b>${req.body.place}</b>. Nahlášeno uživatelem <i>${req.user.email}</i> a <b>vy</b> jste byli přiděleni. <a href="${global.frontendPublic}">Přejít do portálu Delta Homepage</a>`
	}
	global.smtpTransport.sendMail(mailOptions, function(error, response){
		error && console.log(error)
	});

	res.status(200).redirect(global.frontendPublic + '/helpdesk')
})

router.put('/update', global.isAuth, async (req, res) => {
	const action = JSON.parse(req.body.action)
	const problem = Problem.findById(action.id)
	if(action.variant === 'souhlas') {
		await Problem.updateOne(problem, { $addToSet: {liked_by: req.user.email}})
	} else if(action.variant === 'vyreseno' || action.variant === 'prace') {
		console.log(problem, problem.assigned, req.user.email, problem.assigned == req.user.email)
		if(problem.assigned == req.user.email) {
			await Problem.updateOne(problem, { $set: {status: action.variant === 'vyreseno' ? "solved" : "work"}})

			const mailOptions = {
				from: `${process.env.MAIL_USERNAME}@${process.env.MAIL_DOMAIN}`,
				to: problem.reporter,
				subject: 'Helpdesk',
				html: `Váš problém <b>${problem.problem}</b> na Helpdesku nahlášený ${problem.datetime} byl označen jako <b>${action.variant === 'vyreseno' ? "vyřešený" : "🚧🛠️🏗️"}</b>. <a href="${global.frontendPublic}">Přejít do portálu Delta Homepage</a>`
			}
			global.smtpTransport.sendMail(mailOptions, function(error, response){
				error && console.log(error)
			});
		}
	}

	res.redirect(global.frontendPublic + '/helpdesk')
})

router.delete('/delete', global.isAuth, async (req, res) => {

	const id = req.body.id;
	const problem = await Problem.findById(id)

	if(req.user.email == problem.reporter || req.user.role === 'admin') {
		await Problem.findByIdAndRemove(req.body.id);
	}

	res.status(200).redirect(global.frontendPublic + '/helpdesk')
});

router.get('/posts', async (req, res) => {
	Problem.find().then(problems => res.status(200).json(problems))
})

module.exports = router;
