const mongoose = require('mongoose')

const User = new mongoose.model('User', new mongoose.Schema({
	email: String,
	password: String,
	accountActive: Boolean,
	role: String,
	male: Boolean,
	name: String,
	surname: String,
	bk_user: String,
	bk_pass: String
}));

module.exports = User;
