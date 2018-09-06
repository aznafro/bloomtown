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
	Post.findById(req.params.id).populate("comments").exec(function(error, post) {
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
router.get("/:id/comment/new", middleware.isAuthenticated, function(req, res) {
	res.render("comment/new", {
		postId: req.params.id
	});
});

// create - comment
router.post("/:id/comment", middleware.isAuthenticated, function(req, res) {
	var comment = req.body.comment;
	var postId = req.params.id;
	comment.commenter = req.user.username;
	Post.findById(postId, function(error, post) {
		if(error) {
			console.log(error.message);
			res.redirect("back");
		} else {
			Comment.create(comment, function(error, comment) {
				if(error) {
					console.log(error.message);
					res.redirect("back");
				} else {
					post.comments.push(comment);
					post.save(function(error) {
						if(error) {
							console.log(error.message);
							res.redirect("back");
						} else {
							console.log("Successfully added comment");
							res.redirect("/posts/" + req.params.id);
						}
					});
				}
			});
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