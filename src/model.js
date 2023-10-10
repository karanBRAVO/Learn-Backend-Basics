// create model
const mongoose = require('mongoose');

const learnDB = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	}
});

const learnDB_model = new mongoose.model('Data', learnDB); // name of collection, schema

module.exports = learnDB_model;
