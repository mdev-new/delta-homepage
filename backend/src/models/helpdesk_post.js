const mongoose = require('mongoose')

const Problem = new mongoose.model('Problem', new mongoose.Schema({
	text: String,
	tagged_people: Array,
	hashtags: Array,
	attachments: Array
}))

module.exports = Problem;
