var express = require("express");
var router = express.Router();
var passport = require("passport");
var middleware = require("../middleware/middleware");

var User = require("../models/user");

router.get("/login", function(req, res) {
	res.render("user/login");
});

router.post("/login", passport.authenticate("local", {
	failureRedirect: "/login",
}), function(req, res) {
	res.end();
	res.redirect("/posts");
});

router.get("/logout", middleware.isAuthenticated, function(req, res) {
	req.logout();
	res.redirect("/posts");
});

router.get("/register", function(req, res) {
	res.render("user/register");
});

router.post("/register", function(req, res) {
	// get info
	var username = req.body.username;
	var password = req.body.password;
	var rePassword = req.body.rePassword;

	if(rePassword == password) {
		User.register(new User({username: username}), password, function(error, user) {
			if(error) {
				console.log(error.message);
				return res.render("user/register");
			} else {
				console.log("Successfully created new user");
				passport.authenticate("local")(req, res, function() {
					res.redirect("/posts");
				});
			}
		});
	} else {
		console.log("Passwords did not match");
		res.redirect("/register");
	}
});

module.exports = router;