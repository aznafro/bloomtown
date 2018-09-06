var mongoose = require("mongoose");

var flowerSchema = mongoose.Schema({
	name: String,
	imgURL: String,
	desc: String,
	price: Number
});

module.exports = mongoose.model("Flower", flowerSchema);