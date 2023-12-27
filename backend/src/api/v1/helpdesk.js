const express = require('express');
const passport = require('passport')
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

function isAuth(req, res, next)
{
	if (req.isAuthenticated()) return next();
	res.status(401).redirect(global.frontendPublic + '/unauthorized');
}

function isAuth_headless(req, res, next)
{
	if (req.isAuthenticated()) return next();
	res.status(401).json();
}

// todo kazdych 24h poslat mail nevyresenym prirazenym ticketum

// todo check if authenticated
router.post('/post', isAuth, async (req, res) => {
	database.insertOne('problems', {
		problem: req.body.problem,
		place: req.body.place,
		reporter: req.user.email,
		assigned: req.body.assignee,
		datetime: new Date().toString(),
		liked_by: [],
		solved: false
	}).catch(console.error);
	res.status(200).redirect(global.frontendPublic + '/helpdesk')
})

router.post('/update', isAuth_headless, (req, res) => {
	console.log(req.body, req.user)
	if(req.body.variant === 'souhlas') {
		database.updateOne('problems', {_id: new ObjectId(req.body.id)}, {$push: {liked_by: req.user.email}})
	} else if(req.body.variant === 'vyreseno') { // todo check perms
		database.updateOne('problems', {_id: new ObjectId(req.body.id)}, {$set: {solved: true}})
	}
})

router.get('/posts', async (req, res) => {
	res.status(200).json(await database.queryAll('problems'))
})

module.exports = router;
