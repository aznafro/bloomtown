var express = require("express");
var app = express();
var mongoose = require("mongoose");
var Flower = require("./models/flower");
var seed = require("./seed");
var passport = require("passport");
var expressSession = require("express-session");
var localStrategy = require("passport-local");
var User = require("./models/user");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");


var blogRoutes = require("./routes/blog");
var userRoutes = require("./routes/user");
var indexRoutes = require("./routes/index");

// init DB
mongoose.connect(process.env.BLOOMTOWN_DB);
// seed();

app.use(expressSession({
	secret: "hello world",
	resave: false,
	saveUnitialized: false,
	rolling: true,
	cookie: {
		maxAge: 60000
	}
}));

app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new localStrategy(User.authenticate()));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.use(function(req, res, next) {
	res.locals.user = req.user;
	res.locals.cart = req.session.cart;
	next();
});


// ROUTES
app.use("/posts", blogRoutes);
app.use(userRoutes);
app.use(indexRoutes);

var middleware = require("./middleware/middleware");

app.put("/addToCart/:flowerId", function(req, res) {
	var foundInCart = false;

	// if this is the first item, then init cart
	if(!req.session.cart) {
		req.session.cart = [];
	} else {

		// otherwise see if the item is already in the cart
		try {
			req.session.cart.forEach(function(item) {
				if(item.flower._id == req.params.flowerId) {
					item.count += req.body.howManyFlowers;
					foundInCart = true;
					throw BreakException;
				}
			});
		} catch(e) {
		}
	}

	// if not then add it
	if(!foundInCart) {
		Flower.findById(req.params.flowerId, function(error, flower) {
			if(error) {
				console.log(error.message);
				res.redirect("back");
			} else {
				req.session.cart.push({
					flower: flower,
					count: req.body.howManyFlowers
				});
				res.redirect("/flowers");
			}
		});
	}
});

app.post("/checkout", function(req, res) {
	console.log("MADE MONEY BITCHES!");
	res.redirect("/flowers");
});

app.get("/checkout", middleware.isAuthenticated, function(req, res) {
	res.render("checkout", {
		cart: req.session.cart
	});
});

app.listen(process.env.PORT || 3000, process.env.IP, function() {
	console.log("Flower shop up and running");
});