const { MongoClient } = require('mongodb');

function Database(url, database)
{
	this.dbClient = new MongoClient(url)
	this.dbClient.connect()
	this.db = this.dbClient.db(database)
}

Database.prototype.insertOne = function(col, obj) {
	return this.db.collection(col).insertOne(obj)
}

Database.prototype.findOne = async function(col, obj) {
	return await this.db.collection(col).findOne(obj)
}

Database.prototype.updateOne = async function(col, search, replace) {
	return await this.db.collection(col).updateOne(search, replace)
}

Database.prototype.deleteOne = async function(col, doc) {
	return await this.db.collection(col).deleteOne(doc)
}

Database.prototype.query = async function(col, obj) {
	return await this.db.collection(col).find(obj).toArray()
}

Database.prototype.queryAll = async function(col) {
	return await this.db.collection(col).find({}).toArray()
}

module.exports = Database;
