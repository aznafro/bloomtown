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

// new - post
router.get("/new", middleware.isAuthenticated, function(req, res) {
	res.render("blog/new");
});

// show - post
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

// create - post
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

// edit - post
router.get("/:id/edit", middleware.isAuthenticated, function(req, res) {
	var id = req.params.id;
	Post.findById(id, function(error, post) {
		if(error) {
			console.log(error.message);
			res.redirect("back");
		} else {
			res.render("blog/edit", {
				post: post
			}); 
		}
	});
});

// update - post
router.put("/:id", middleware.isAuthenticated, function(req, res) {
	var post = req.body.post;
	var id = req.params.id;
	Post.findByIdAndUpdate(id, post, function(error, post) {
		if(error) {
			console.log(error.message);
			res.redirect("back");
		} else {
			console.log("Successfully updated Post");
			res.redirect("/posts/" + id);
		}
	});
});

// destroy - post
router.delete("/:id", middleware.isAuthenticated, function(req, res) {
	var id = req.params.id;
	Post.findByIdAndRemove(id, function(error, post) {
		if(error) {
			console.log(error.message);
			res.redirect("back");
		} else {
			var counter = post.comments.length;
			post.comments.forEach(function(comment) {
				Comment.findByIdAndRemove(comment._id, function(error) {
					if(error) {
						console.log(error.message);
					} else {
						// after deleting the last comment, return to the posts page
						if(--counter == 0) {
							res.redirect("/posts");
						}
					}
				});
			});	
		}
	});
});

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
router.get("/:id/comment/:commentId/edit", middleware.isAuthenticated, function(req, res) {
	var postId = req.params.id;
	var commentId = req.params.commentId;
	Comment.findById(commentId, function(error, comment) {
		if(error) {
			console.log(error.message);
			res.redirect("back");
		} else {
			console.log("Found comment");
			res.render("comment/edit", {
				postId: postId,
				comment: comment
			});
		}
	});
});

// update - comment
router.put("/:id/comment/:commentId", middleware.isAuthenticated, function(req, res) {
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
router.delete("/:id/comment/:commentId", middleware.isAuthenticated, function(req, res) {
	Post.findById(req.params.id, function(error, post) {
		if(error) {
			console.log(error.message);
			res.redirect("back");
		} else {
			Comment.findByIdAndRemove(req.params.commentId, function(error) {
				if(error) {
					console.log(error.message);
				} else {
					console.log("Successfully deleted comment");
				}
				post.comments.remove(req.params.commentId);
				post.save(function(error) {
					if(error) {
						console.log(error.message);
					}
					res.redirect("/posts/" + req.params.id);
				});
			});
		}
	});
});

module.exports = router;