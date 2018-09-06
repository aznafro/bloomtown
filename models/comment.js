var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
	commenter: String,
	date: {
		type: Date,
		default: Date.now
	},
	content: String
});

module.exports = mongoose.model("Comment", commentSchema);