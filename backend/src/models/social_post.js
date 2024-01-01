const mongoose = require('mongoose')

const SocialPost = new mongoose.model('SocialPost', new mongoose.Schema({
	problem: String,
	place: String,
	reporter: String,
	assigned: String,
	datetime: String,
	liked_by: Array,
	status: String,
	type: String
}))

module.exports = SocialPost;
