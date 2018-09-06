var express = require("express");
var router = express.Router();
var middleware = require("../middleware/middleware");

var Flower = require("../models/flower");

router.get("/", function(req, res) {
	res.render("home");
});

router.get("/flowers", function(req, res) {
	Flower.find({}, function(error, flowers) {
		res.render("flowers", {
			flowers:  flowers
		});
	});
});

router.get("/order", middleware.isAuthenticated, function(req, res) {
	res.render("order");
});

router.get("/contact", middleware.isAuthenticated, function(req, res) {
	res.render("contact");
});

router.get("/about", function(req, res) {
	res.render("about");
});

module.exports = router;