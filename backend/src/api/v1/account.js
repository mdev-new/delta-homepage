const express = require('express');
const passport = require('passport')
const router = express.Router();

router.post('/login', passport.authenticate('local',
{
	successRedirect: 'https://localhost:3000/account',
	failureRedirect: 'https://localhost:3000/'
}));

router.post('/register', (req, res) => {

})

router.delete('/logout', (req, res) => {
	req.logOut(err => {
    	if (err) return next(err);
    	res.redirect('https://localhost:3000/account');
 	});
})

router.get('/authOk', (req, res) => {
	console.log(req.isAuthenticated())
	res.status(200).json({auth: req.isAuthenticated()});
})

module.exports = router;
