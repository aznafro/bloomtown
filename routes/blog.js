var express = require("express");
var router = express.Router();
var middleware = require("../middleware/middleware");

var Post = require("../models/post");
var Comment = require("../models/comment");

// index
router.get("/", function(req, res) {
	Post.find({}, function(error, posts) {
		if(error) {
			console.log(error.message);
			res.redirect("back");
		}
		res.render("blog/blog", {
			posts: posts
		});
	});
});

// new
router.get("/new", middleware.isAuthenticated, function(req, res) {
	res.render("blog/new");
});

// show
router.get("/:id", function(req, res) {
	Post.findById(req.params.id, function(error, post) {
		if(error) {
			console.log(error.message);
			res.redirect("back");
		} else {
			res.render("blog/show", {
				post: post
			});
		}
	});
});

// create
router.post("/", middleware.isAuthenticated, function(req, res) {
	var post = req.body.post;
	post.poster = req.user.username;
	Post.create(post, function(error, post) {
		if(error) {
			console.log(error.message);
			res.redirect("back");
		} else {
			console.log("Successfully created new post!");
			res.redirect("/posts/" + post._id);
		}
	});
});

// edit

// update

// destroy

// new - comment
router.get("/comment/new", middleware.isAuthenticated, function(req, res) {
	res.render("comment/new");
});

// create - comment
router.post("/comment", middleware.isAuthenticated, function(req, res) {
	var comment = req.body.comment;
	comment.commenter = req.user.username;
	Comment.create(comment, function(error, comment) {
		if(error) {
			console.log(error.message);
			res.redirect("back");
		} else {
			console.log("Successfully added comment");
			res.redirect("/posts/" + req.params.id);
		}
	});
});

// edit - comment
router.get("/comment/:commentId/edit", middleware.isAuthenticated, function(req, res) {
	res.render("comment/edit");
});

// update - comment
router.put("/comment/:commentId", middleware.isAuthenticated, function(req, res) {
	var comment = req.body.comment;
	Comment.findByIdAndUpdate(req.params.commentId, comment, function(error, comment) {
		if(error) {
			console.log(error.message);
			res.redirect("back");
		} else {
			console.log("Successfully updated comment");
			res.redirect("/posts/" + req.params.id);
		}
	});
});

// destroy - comment
router.delete("/comment/:commentId", middleware.isAuthenticated, function(req, res) {

});

module.exports = router;