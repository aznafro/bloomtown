var mongoose = require("mongoose");

var postSchema = mongoose.Schema({
	poster: String,
	date: {
		type: Date,
		default: Date.now
	},
	title: String,
	content: String,
	images: [String],
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
	}]
});


module.exports = mongoose.model("Post", postSchema);