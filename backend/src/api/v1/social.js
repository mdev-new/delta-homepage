const express = require('express');
const passport = require('passport')
const router = express.Router();

router.get('/posts', async (req, res) => {
	res.status(200).json(await global.database.queryAll('social_posts'))
})

router.post('/post', global.isAuth, async (req, res) => {
	const date = new Date();
	global.database.insertOne('social_posts', {
		text: req.body.text,
		datetime: `${date.getDate()}.${date.getMonth()} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
		poster: req.user.email
	}).catch(console.error);

	res.status(200).redirect(global.frontendPublic + '/social')
})

module.exports = router;
