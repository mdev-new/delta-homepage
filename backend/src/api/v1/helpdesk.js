const express = require('express');
const passport = require('passport')
const router = express.Router();

function isAuth(req, res, next)
{
	if (req.isAuthenticated()) return next();
	res.redirect(global.frontendPublic + '/unauthorized');
}

// todo check if authenticated
router.post('/post', isAuth, async (req, res) => {
	database.insertOne('problems', {
		problem: req.body.problem,
		place: req.body.place,
		assigned_person: "",
		liked_by: [],
	}).catch(console.error);
	res.status(200).redirect(global.frontendPublic + '/helpdesk')
})

router.get('/posts', async (req, res) => {
	res.status(200).json(await database.queryAll('problems'))
})

module.exports = router;
