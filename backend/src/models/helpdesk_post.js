const mongoose = require('mongoose')

const Problem = new mongoose.model('Problem', new mongoose.Schema({
	problem: String,
	place: String,
	reporter: String,
	assigned: String,
	datetime: String,
	liked_by: Array,
	status: String,
	type: String
}))

module.exports = Problem;
