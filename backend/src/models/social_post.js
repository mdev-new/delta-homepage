const mongoose = require('mongoose')

const SocialPost = new mongoose.model('SocialPost', new mongoose.Schema({
	text: String,
	datetime: String,
	poster: String,
	hashtags: Array,
	tagged_people: Array,
	attachments: Array,
	likes: Array,
	repliesTo: String
}))

module.exports = SocialPost;
